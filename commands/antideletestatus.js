import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, ownerData }) => {
    const dataPath = path.join(__dirname, '..', 'data', 'owner.json');
    ownerData.antiDeleteStatus = !ownerData.antiDeleteStatus;
    fs.writeFileSync(dataPath, JSON.stringify(ownerData, null, 2));
    await sock.sendMessage(from, { text: `✅ AntiDeleteStatus is now *${ownerData.antiDeleteStatus ? 'ON' : 'OFF'}*` }, { quoted: m });
  },
};
