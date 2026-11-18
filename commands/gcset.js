import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  execute: async ({ sock, m, from }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    
    const setPath = path.join(__dirname, '..', 'data', 'group_settings.json');
    const data = JSON.parse(fs.readFileSync(setPath, 'utf8'));
    const s = data[from] || {};

    const text = `⚙️ *GROUP SETTINGS*\n\n` +
      `🚫 Anti-Link: ${s.antiLink ? '✅ ON' : '❌ OFF'}\n` +
      `🤬 Anti-Badword: ${s.antiBadword ? '✅ ON' : '❌ OFF'}\n` +
      `🏷️ Anti-Tag: ${s.antiTag ? '✅ ON' : '❌ OFF'}\n` +
      `🐌 Slowmode: ${s.slowmode ? '✅ ON' : '❌ OFF'}\n` +
      `👋 Welcome: ${s.welcome ? '✅ ON' : '❌ OFF'}\n` +
      `👋 Goodbye: ${s.goodbye ? '✅ ON' : '❌ OFF'}`;

    await sock.sendMessage(from, { text }, { quoted: m });
  },
};
