import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, args }) => {
    const mode = args[0]?.toLowerCase();
    if (!['public', 'private'].includes(mode)) {
      return sock.sendMessage(from, { text: '❌ Usage: .mode public OR .mode private' }, { quoted: m });
    }

    const dataPath = path.join(__dirname, '..', 'data', 'owner.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    data.mode = mode;
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    await sock.sendMessage(from, { text: `✅ Bot mode changed to *${mode.toUpperCase()}*` }, { quoted: m });
  },
};
