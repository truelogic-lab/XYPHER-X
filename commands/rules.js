import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  execute: async ({ sock, m, from, args }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    
    const setPath = path.join(__dirname, '..', 'data', 'group_settings.json');
    const data = JSON.parse(fs.readFileSync(setPath, 'utf8'));
    if (!data[from]) data[from] = {};

    const newRules = args.join(' ');
    if (newRules) {
      data[from].rules = newRules;
      fs.writeFileSync(setPath, JSON.stringify(data, null, 2));
      return sock.sendMessage(from, { text: '✅ Group rules updated successfully.' }, { quoted: m });
    }

    const rules = data[from].rules || 'No rules have been set for this group yet.';
    await sock.sendMessage(from, { text: `📜 *GROUP RULES*\n\n${rules}` }, { quoted: m });
  },
};
