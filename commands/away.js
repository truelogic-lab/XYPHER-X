import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, args, ownerData }) => {
    const dataPath = path.join(__dirname, '..', 'data', 'owner.json');
    const reason = args.join(' ') || 'I am currently away.';
    
    ownerData.away = ownerData.away ? null : reason;
    fs.writeFileSync(dataPath, JSON.stringify(ownerData, null, 2));
    
    await sock.sendMessage(from, { text: ownerData.away ? `🌴 Away mode ON: ${reason}` : '🌴 Away mode OFF' }, { quoted: m });
  },
};
