import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import fs from 'fs';
import path from 'path';
import settings from './settings.js';
import {
  createSession,
  attachMessageHandler,
  listSessions,
  sessionCount,
  removeSession,
  getSession,
} from './lib/session-manager.js';
import { loadPlugins } from './lib/handler.js';

process.on('uncaughtException', (err) => console.error(chalk.red('💥 Uncaught:'), err.message));
process.on('unhandledRejection', (err) => console.error(chalk.red('⚠️ Unhandled:'), err?.message || err));

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

const pairingLocks = new Map();

function requireApiKey(req, res, next) {
  const key = req.headers['x-api-key'];
  if (key !== settings.apiKey) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

app.post('/connect', requireApiKey, async (req, res) => {
  let cleanPhone = '';
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: 'Phone number required' });

    cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    const existing = getSession(cleanPhone);
    if (existing?.sock?.user) return res.json({ status: 'already_connected', phone: cleanPhone });
    if (pairingLocks.has(cleanPhone)) return res.status(429).json({ error: 'Pairing in progress. Wait 30s.' });

    pairingLocks.set(cleanPhone, Date.now());

    if (existing && !existing.sock?.user) await removeSession(cleanPhone);

    const sessionData = await createSession(cleanPhone);
    attachMessageHandler(sessionData);
    const sock = sessionData.sock;

    await new Promise(r => setTimeout(r, 2000));

    if (sock.authState.creds.registered) {
      pairingLocks.delete(cleanPhone);
      return res.json({ status: 'already_registered', phone: cleanPhone });
    }

    pairingLocks.delete(cleanPhone);
    return res.json({
      status: 'pairing_started',
      phone: cleanPhone,
      instructions: 'Check your bot terminal for the 8-digit pairing code.'
    });

  } catch (err) {
    console.error(chalk.red('Connect error:'), err);
    if (cleanPhone) {
      pairingLocks.delete(cleanPhone);
      try { await removeSession(cleanPhone); } catch {}
    }
    return res.status(500).json({ error: err.message });
  }
});

app.get('/status/:phone', requireApiKey, (req, res) => {
  const cleanPhone = req.params.phone.replace(/\D/g, '');
  const session = getSession(cleanPhone);
  res.json({ phone: cleanPhone, active: !!session?.sock?.user, pairing: pairingLocks.has(cleanPhone) });
});

app.get('/sessions', requireApiKey, (req, res) => {
  res.json({ count: sessionCount(), sessions: listSessions() });
});

app.post('/disconnect', requireApiKey, async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number required' });
  const cleanPhone = phone.replace(/\D/g, '');
  pairingLocks.delete(cleanPhone);
  const removed = await removeSession(cleanPhone);
  res.json({ phone: cleanPhone, removed });
});

app.get('/health', (req, res) => {
  const mem = process.memoryUsage();
  res.json({ status: 'ok', bot: settings.botName, activeSessions: sessionCount(), heapUsedMB: parseFloat((mem.heapUsed / 1024 / 1024).toFixed(1)) });
});

async function bootstrap() {
  console.clear();
  const bannerText = figlet.textSync(settings.botName, { font: 'Standard' });
  console.log(gradient.pastel.multiline(bannerText));
  console.log(chalk.gray('  ───────────────────────────────────────────────────'));
  console.log(chalk.white(`  🤖 Bot Name  : `) + chalk.cyan(settings.botName));
  console.log(chalk.white(`  🔑 API Key   : `) + chalk.yellow(settings.apiKey));
  console.log(chalk.white(`  🔧 Prefix    : `) + chalk.green(settings.prefix));
  console.log(chalk.gray('  ───────────────────────────────────────────────────\n'));
  
  await loadPlugins();

  // ⚡ AUTO-LOAD SAVED SESSIONS ⚡
  const SESSION_DIR = './session_data';
  if (fs.existsSync(SESSION_DIR)) {
    const folders = fs.readdirSync(SESSION_DIR).filter(f => fs.statSync(path.join(SESSION_DIR, f)).isDirectory());
    if (folders.length > 0) {
      console.log(chalk.blue(`\n🔄 Found ${folders.length} saved session(s). Loading...`));
      for (const phone of folders) {
        try {
          console.log(chalk.yellow(`   ↳ Restoring ${phone}...`));
          const sessionData = await createSession(phone);
          attachMessageHandler(sessionData);
        } catch (e) {
          console.log(chalk.red(`   ✖ Failed to restore ${phone}: ${e.message}`));
        }
      }
    }
  }

  app.listen(settings.port, '0.0.0.0', () => {
    console.log(chalk.gray('\n  ───────────────────────────────────────────────────'));
    console.log(chalk.white(`  🌐 Server    : `) + chalk.blue(`http://0.0.0.0:${settings.port}`));
    console.log(chalk.white(`  ⚡ Status    : `) + chalk.green('ONLINE ✅'));
    console.log(chalk.gray('  ───────────────────────────────────────────────────\n'));
  });
}
bootstrap();
