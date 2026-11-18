import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, ownerData }) => {
    const dataPath = path.join(__dirname, '..', 'data', 'owner.json');
    ownerData.autoRecording = !ownerData.autoRecording;
    fs.writeFileSync(dataPath, JSON.stringify(ownerData, null, 2));
    await sock.sendMessage(from, { text: `✅ AutoRecording is now *${ownerData.autoRecording ? 'ON' : 'OFF'}*` }, { quoted: m });
  },
};
