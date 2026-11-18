import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, args }) => {
    const target = args[0]?.replace(/\D/g, '');
    if (!target) return sock.sendMessage(from, { text: '❌ Provide a number.' }, { quoted: m });
    const dataPath = path.join(__dirname, '..', 'data', 'owner.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    data.banned = data.banned || [];
    data.banned = data.banned.filter(num => num !== target);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    await sock.sendMessage(from, { text: `✅ Unbanned *${target}*.` }, { quoted: m });
  },
};
