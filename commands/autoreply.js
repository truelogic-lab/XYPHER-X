import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, args, ownerData }) => {
    const message = args.join(' ');
    const dataPath = path.join(__dirname, '..', 'data', 'owner.json');
    
    if (!message) {
      ownerData.autoReply = null;
      fs.writeFileSync(dataPath, JSON.stringify(ownerData, null, 2));
      return sock.sendMessage(from, { text: '✅ Auto-Reply disabled.' }, { quoted: m });
    }

    ownerData.autoReply = message;
    fs.writeFileSync(dataPath, JSON.stringify(ownerData, null, 2));
    await sock.sendMessage(from, { text: `✅ Auto-Reply set to: *${message}*` }, { quoted: m });
  },
};
