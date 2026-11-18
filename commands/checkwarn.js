import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  aliases: ['warnings'],
  execute: async ({ sock, m, from, args }) => {
    const target = m.message.extendedTextMessage?.contextInfo?.participant || (args[0] ? args[0].replace(/\D/g, '') + '@s.whatsapp.net' : null);
    if (!target) return sock.sendMessage(from, { text: '❌ Tag someone.' }, { quoted: m });
    const warnPath = path.join(__dirname, '..', 'data', 'warnings.json');
    const data = JSON.parse(fs.readFileSync(warnPath, 'utf8'));
    const count = data[from]?.[target] || 0;
    await sock.sendMessage(from, { text: `⚠️ @${target.split('@')[0]} has *${count}/3* warnings.`, mentions: [target] }, { quoted: m });
  },
};
