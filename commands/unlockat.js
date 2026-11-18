import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  execute: async ({ sock, m, from, args }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    const time = args[0];
    if (!time) return sock.sendMessage(from, { text: '❌ Usage: .unlockat 10m' }, { quoted: m });

    let ms = 0;
    if (time.endsWith('s')) ms = parseInt(time) * 1000;
    else if (time.endsWith('m')) ms = parseInt(time) * 60000;
    else if (time.endsWith('h')) ms = parseInt(time) * 3600000;
    else return sock.sendMessage(from, { text: '❌ Invalid time. Use 10s, 5m, 1h.' }, { quoted: m });

    await sock.sendMessage(from, { text: `⏱️ Group will be unlocked in ${time}.` }, { quoted: m });
    
    setTimeout(async () => {
      await sock.groupSettingUpdate(from, 'not_announcement').catch(() => {});
      await sock.sendMessage(from, { text: '🔓 Group unlocked.' }).catch(() => {});
    }, ms);
  },
};
