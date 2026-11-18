import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, args }) => {
    const target = args[0]?.replace(/\D/g, '');
    if (!target) return sock.sendMessage(from, { text: '❌ Tag a user or provide a number.' }, { quoted: m });
    const dataPath = path.join(__dirname, '..', 'data', 'owner.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    data.sudo = data.sudo || [];
    if (data.sudo.includes(target)) return sock.sendMessage(from, { text: 'User is already a sudo.' }, { quoted: m });
    data.sudo.push(target);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    await sock.sendMessage(from, { text: `✅ Added *${target}* as Sudo.` }, { quoted: m });
  },
};
