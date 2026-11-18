import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default {
  ownerOnly: true,
  execute: async ({ sock, m, from }) => {
    const dataPath = path.join(__dirname, '..', 'data', 'owner.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const sudoList = data.sudo || [];
    let text = '👑 *SUDO LIST*\n\n';
    if (sudoList.length === 0) text += 'No sudo users.';
    else sudoList.forEach((num, i) => text += `${i + 1}. +${num}\n`);
    await sock.sendMessage(from, { text }, { quoted: m });
  },
};
