import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, args, ownerData }) => {
    const persona = args.join(' ');
    const dataPath = path.join(__dirname, '..', 'data', 'owner.json');
    
    if (!persona) {
      ownerData.persona = null;
      fs.writeFileSync(dataPath, JSON.stringify(ownerData, null, 2));
      return sock.sendMessage(from, { text: '✅ Persona cleared. Default bot behavior.' }, { quoted: m });
    }

    ownerData.persona = persona;
    fs.writeFileSync(dataPath, JSON.stringify(ownerData, null, 2));
    await sock.sendMessage(from, { text: `🎭 Persona updated to: *${persona}*` }, { quoted: m });
  },
};
