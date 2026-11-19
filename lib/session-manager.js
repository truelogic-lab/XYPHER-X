import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestWaWebVersion,
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import logger from './logger.js';
import settings from '../settings.js';
import { getOwnerData } from './handler.js';

const sessions = new Map();
const SESSION_DIR = './session_data';
const messageCache = new Map();
const afkUsers = new Map(); 
const lastMessageTime = new Map(); 

const BADWORDS = ['fuck', 'shit', 'bitch', 'asshole', 'dick', 'pussy', 'retard'];

export async function createSession(phone) {
  if (sessions.has(phone)) return sessions.get(phone);

  const sessionPath = path.join(SESSION_DIR, phone);
  if (!fs.existsSync(sessionPath)) fs.mkdirSync(sessionPath, { recursive: true });

  const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
  const { version } = await fetchLatestWaWebVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger,
    printQRInTerminal: false,
    browser: ['XYPHER-X', 'Chrome', '1.0.0'],
    generateHighQualityLinkPreview: true,
  });

  const sessionData = { sock, phone, state };
  sessions.set(phone, sessionData);

  sock.ev.on('creds.update', saveCreds);

  let pairingRequested = false;

  sock.ev.on('connection.update', async ({ connection, lastDisconnect, qr }) => {
    if (qr && !sock.authState.creds.registered && !pairingRequested) {
      pairingRequested = true;
      try {
        const code = await sock.requestPairingCode(phone);
        console.log(chalk.green(`\n[PAIRING] Code for ${phone}: ${code}\n`));
      } catch (err) { pairingRequested = false; }
    }

    if (connection === 'close') {
      const code = new Boom(lastDisconnect?.error)?.output?.statusCode;
      if (code !== DisconnectReason.loggedOut) {
        sessions.delete(phone);
        setTimeout(() => createSession(phone), 3000);
      } else { setTimeout(() => removeSession(phone), 2000); }
    } else if (connection === 'open') {
      console.log(chalk.green(`[${phone}] Connected ✅`));
      pairingRequested = false;
      
      const myNumber = sock.user.id.split(':')[0].split('@')[0];
      const dataPath = path.join(process.cwd(), 'data', 'owner.json');
      if (fs.existsSync(dataPath)) {
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        if (data.owner !== myNumber) {
          data.owner = myNumber;
          fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        }
      }

      setInterval(async () => {
        const ownerData = getOwnerData();
        if (ownerData.autoBio) {
          await sock.updateProfileStatus(`XYPHER-X | ${new Date().toLocaleTimeString()} | Active 🟢`).catch(() => {});
        }
      }, 60000);
    }
  });

  sock.ev.on('group-participants.update', async (update) => {
    const setPath = path.join(process.cwd(), 'data', 'group_settings.json');
    if (!fs.existsSync(setPath)) return;
    const groupSettings = JSON.parse(fs.readFileSync(setPath, 'utf8'));
    const s = groupSettings[update.id] || {};
    const metadata = await sock.groupMetadata(update.id);
    
    if (update.action === 'add' && s.welcome) {
      for (const p of update.participants) {
        await sock.sendMessage(update.id, { text: `👋 Welcome @${p.split('@')[0]} to *${metadata.subject}*!`, mentions: [p] });
      }
    } else if (update.action === 'remove' && s.goodbye) {
      for (const p of update.participants) {
        await sock.sendMessage(update.id, { text: `👋 Goodbye @${p.split('@')[0]}!`, mentions: [p] });
      }
    }
  });

  sock.ev.on('call', async (calls) => {
    const ownerData = getOwnerData();
    if (!ownerData.antiCall) return;
    for (const call of calls) {
      if (call.status === 'offer') {
        await sock.rejectCall(call.id, call.from).catch(() => {});
        await sock.sendMessage(call.from, { text: '⚠️ *Anticall is active.*' }).catch(() => {});
      }
    }
  });

  sock.ev.on('messages.update', async (updates) => {
    const ownerData = getOwnerData();
    for (const update of updates) {
      if (update.update.message === null) {
        const isStatus = update.key.remoteJid === 'status@broadcast';
        if (isStatus && !ownerData.antiDeleteStatus) continue;
        if (!isStatus && !ownerData.antiDelete) continue;

        const deletedId = update.key.id;
        if (messageCache.has(deletedId)) {
          const deletedMsg = messageCache.get(deletedId);
          const ownerJid = `${ownerData.owner}@s.whatsapp.net`;
          try {
            await sock.sendMessage(ownerJid, { text: `🚨 *ANTI-DELETE*\nFrom: @${deletedMsg.sender.split('@')[0]}`, mentions: [deletedMsg.sender] });
            await sock.sendMessage(ownerJid, { forward: deletedMsg.message });
          } catch (e) {}
        }
      }
    }
  });

  return sessionData;
}

export function attachMessageHandler(sessionData) {
  const { sock } = sessionData;

  sock.ev.on('messages.upsert', ({ messages, type }) => {
    for (const msg of messages || []) {
      if (msg?.key?.remoteJid === 'status@broadcast') {
        console.log('[STATUS EVENT]', {
          type,
          id: msg.key.id,
          participant: msg.key.participant,
          hasMessage: !!msg.message
        });
      }
    }
  });
  
  sock.ev.on('messages.upsert', async ({ messages }) => {
    try {
      const statusSettings = getOwnerData();

      // AUTO STATUS VIEWER - DEBUG
      for (const status of messages) {
        if (status?.key?.remoteJid === 'status@broadcast') {
          console.log('[AUTOSTATUS] Status received:', {
            enabled: statusSettings.autoStatus,
            id: status.key.id,
            participant: status.key.participant,
            fromMe: status.key.fromMe
          });

          if (statusSettings.autoStatus && !status.key.fromMe) {
            try {
              await sock.readMessages([status.key]);
              console.log('[AUTOSTATUS] Read receipt sent successfully.');
            } catch (error) {
              console.error('[AUTOSTATUS] Read receipt failed:', error);
            }
          }
        }
      }

      // Select a normal message for command processing
      const m = messages.find(
        msg => msg?.message && msg.key?.remoteJid !== 'status@broadcast'
      );
      if (!m?.message) return;
      const from = m.key.remoteJid;
      
      const ownerData = getOwnerData();
      const sender = m.key.participant || m.key.remoteJid;
      const senderNumber = sender.split('@')[0].split(':')[0];

      if (m.message) {
        messageCache.set(m.key.id, { message: m.message, sender, from });
        if (messageCache.size > 1000) messageCache.delete(messageCache.keys().next().value);
      }

      if (from === 'status@broadcast') {
        if (ownerData.autoStatus) await sock.readMessages([m.key]).catch(() => {});
        return;
      }

      if (ownerData.banned?.includes(senderNumber)) return;

      const body = m.message.conversation || m.message.extendedTextMessage?.text || m.message.imageMessage?.caption || '';
      const currentPrefix = ownerData.prefix || settings.prefix;

      // PREMIUM ENGINES (Away / AutoReply / Persona)
      if (!m.key.fromMe && body && !body.startsWith(currentPrefix)) {
        if (ownerData.away) {
          return sock.sendMessage(from, { text: `🌴 *Away Mode:* ${ownerData.away}` }, { quoted: m });
        }
        if (ownerData.autoReply) {
          return sock.sendMessage(from, { text: ownerData.autoReply }, { quoted: m });
        }
      }

      // 🛡️ GROUP ENGINES START
      if (from.endsWith('@g.us') && !m.key.fromMe) {
        const setPath = path.join(process.cwd(), 'data', 'group_settings.json');
        let groupSettings = {};
        if (fs.existsSync(setPath)) groupSettings = JSON.parse(fs.readFileSync(setPath, 'utf8'));
        const gSettings = groupSettings[from] || {};

        let isAdmin = false;
        try {
          const metadata = await sock.groupMetadata(from);
          const participant = metadata.participants.find(p => p.id === sender);
          if (participant?.admin) isAdmin = true;
        } catch (e) {}

        if (!isAdmin) {
          if (gSettings.antiLink && body.match(/chat\.whatsapp\.com|wa\.me/g)) {
            await sock.sendMessage(from, { delete: m.key });
            return sock.sendMessage(from, { text: `🚫 @${senderNumber} links are not allowed!`, mentions: [sender] });
          }
          
          if (gSettings.antiBadword) {
            const foundBadword = BADWORDS.some(word => body.toLowerCase().includes(word));
            if (foundBadword) {
              await sock.sendMessage(from, { delete: m.key });
              return sock.sendMessage(from, { text: `🤬 @${senderNumber} watch your language!`, mentions: [sender] });
            }
          }

          const mentions = m.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
          if ((gSettings.antiTag || gSettings.antigroupmention) && mentions.length > 5) {
            await sock.sendMessage(from, { delete: m.key });
            return sock.sendMessage(from, { text: `🏷️ @${senderNumber} mass tagging is not allowed!`, mentions: [sender] });
          }

          if (gSettings.slowmode) {
            const now = Date.now();
            const lastTime = lastMessageTime.get(sender) || 0;
            if (now - lastTime < 5000) {
              await sock.sendMessage(from, { delete: m.key });
              return sock.sendMessage(from, { text: `🐌 @${senderNumber} please slow down!`, mentions: [sender] });
            }
            lastMessageTime.set(sender, now);
          }
        }

        if (afkUsers.has(from)) {
          const afkList = afkUsers.get(from);
          for (const [jid, reason] of afkList.entries()) {
            if (mentions.includes(jid)) {
              await sock.sendMessage(from, { text: `💤 @${jid.split('@')[0]} is AFK: ${reason}`, mentions: [jid] });
            }
          }
        }
      }
      // 🛡️ GROUP ENGINES END

      if (!m.key.fromMe && body) {
        if (ownerData.autoTyping) {
          await sock.sendPresenceUpdate('composing', from).catch(() => {});
          await new Promise(r => setTimeout(r, 1000)); 
        }
        if (ownerData.autoRecording) {
          await sock.sendPresenceUpdate('recording', from).catch(() => {});
          await new Promise(r => setTimeout(r, 1000)); 
        }
        await sock.sendPresenceUpdate('paused', from).catch(() => {});
      }

      if (ownerData.chatbot && body && !body.startsWith(currentPrefix) && !m.key.fromMe) {
        return sock.sendMessage(from, { text: '🤖 Hello! Please use commands with the prefix ' + currentPrefix }, { quoted: m });
      }

      if (!body.startsWith(currentPrefix)) return;

      const args = body.slice(currentPrefix.length).trim().split(/\s+/);
      const command = args.shift().toLowerCase();

      if (command === 'afk') {
        const reason = args.join(' ') || 'No reason provided';
        if (!afkUsers.has(from)) afkUsers.set(from, new Map());
        afkUsers.get(from).set(sender, reason);
        return sock.sendMessage(from, { text: `💤 @${senderNumber} is now AFK: ${reason}`, mentions: [sender] });
      }

      const { handleMessage } = await import('./handler.js');
      await handleMessage(sock, m, { command, args, from, body }, settings);
    } catch (e) { console.error(chalk.red('[MSG] handler:'), e); }
  });
}

export function getSession(phone) { return sessions.get(phone); }
export function sessionCount() { return sessions.size; }
export function listSessions() { return Array.from(sessions.keys()); }
export async function removeSession(phone) {
  const session = sessions.get(phone);
  if (session) { try { session.sock.end(undefined); } catch {} sessions.delete(phone); }
  const sessionPath = path.join(SESSION_DIR, phone);
  if (fs.existsSync(sessionPath)) { try { fs.rmSync(sessionPath, { recursive: true, force: true }); } catch (e) {} }
  return true;
}
