import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commands = new Map();
const RECEIVE_REACTIONS = ['🎁', '🥰', '😁', '❣️', '👌', '😅', '😊', '😄', '🫪', '🤔'];

export async function loadPlugins() {
  const cmdDir = path.join(__dirname, '..', 'commands');
  if (!fs.existsSync(cmdDir)) return 0;

  const files = fs.readdirSync(cmdDir).filter(f => f.endsWith('.js'));
  for (const file of files) {
    const filePath = path.join(cmdDir, file);
    const module = await import(`file://${filePath}?update=${Date.now()}`);
    const cmd = module.default;
    const name = file.replace('.js', '');
    
    commands.set(name, cmd);
    (cmd.aliases || []).forEach(a => commands.set(a, cmd));
    console.log(chalk.gray(`[CMD] loaded: ${name}`));
  }
  return files.length;
}

export function getOwnerData() {
  try {
    const dataPath = path.join(__dirname, '..', 'data', 'owner.json');
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch {
    return { owner: '', mode: 'public', prefix: '.' };
  }
}

export async function handleMessage(sock, m, ctx, settings) {
  const { command, args, from, body } = ctx;
  const cmd = commands.get(command);
  if (!cmd) return;

  const ownerData = getOwnerData();
  const sender = m.key.participant || m.key.remoteJid;
  const senderNumber = sender.split('@')[0].split(':')[0]; 
  const isSudo = ownerData.sudo?.includes(senderNumber);
  const isOwner = m.key.fromMe || senderNumber === String(ownerData.owner).trim() || isSudo;

  if (cmd.ownerOnly && !isOwner) {
    return sock.sendMessage(from, { text: '❌ This command is restricted to the Bot Owner.' }, { quoted: m });
  }

  if (ownerData.mode === 'private' && !isOwner) return;

  if (ownerData.autoReact !== false) {
    const randomEmoji = RECEIVE_REACTIONS[Math.floor(Math.random() * RECEIVE_REACTIONS.length)];
    try {
      await sock.sendMessage(from, { react: { text: randomEmoji, key: m.key } });
    } catch (err) {}
  }

  try {
    // 🔥 FIX: Added command to the object being passed to execute
    await cmd.execute({ sock, m, args, from, body, commands, settings, ownerData, command });
    
    if (ownerData.autoReact !== false) {
      await sock.sendMessage(from, { react: { text: '✅', key: m.key } });
    }
  } catch (e) {
    console.error(chalk.red(`[EXEC] ${command}: ${e.message}`));
    await sock.sendMessage(from, { text: `❌ Error: ${e.message}` }, { quoted: m });
    if (ownerData.autoReact !== false) {
      await sock.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
  }
}
