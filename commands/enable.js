import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  execute: async ({ sock, m, from, args }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    const feature = args[0]?.toLowerCase();
    if (!feature) return sock.sendMessage(from, { text: '❌ Usage: .enable <antilink|antibadword|antitag|slowmode>' }, { quoted: m });

    const setPath = path.join(__dirname, '..', 'data', 'group_settings.json');
    const data = JSON.parse(fs.readFileSync(setPath, 'utf8'));
    if (!data[from]) data[from] = {};
    data[from][feature] = true;
    fs.writeFileSync(setPath, JSON.stringify(data, null, 2));

    await sock.sendMessage(from, { text: `✅ *${feature.toUpperCase()}* has been enabled for this group.` }, { quoted: m });
  },
};
