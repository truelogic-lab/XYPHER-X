import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  execute: async ({ sock, m, from, args }) => {
    const target = m.message.extendedTextMessage?.contextInfo?.participant || (args[0] ? args[0].replace(/\D/g, '') + '@s.whatsapp.net' : null);
    if (!target) return sock.sendMessage(from, { text: '❌ Tag someone.' }, { quoted: m });
    const warnPath = path.join(__dirname, '..', 'data', 'warnings.json');
    const data = JSON.parse(fs.readFileSync(warnPath, 'utf8'));
    if (data[from] && data[from][target]) {
      delete data[from][target];
      fs.writeFileSync(warnPath, JSON.stringify(data, null, 2));
    }
    await sock.sendMessage(from, { text: `✅ Warnings reset for @${target.split('@')[0]}`, mentions: [target] });
  },
};
