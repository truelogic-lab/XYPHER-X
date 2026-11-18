import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, args }) => {
    const pass = args[0];
    if (!pass) return sock.sendMessage(from, { text: '❌ Usage: .password <new_password>' }, { quoted: m });
    const dataPath = path.join(__dirname, '..', 'data', 'owner.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    data.password = pass;
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    await sock.sendMessage(from, { text: `✅ Bot password updated.` }, { quoted: m });
  },
};
