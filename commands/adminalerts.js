import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  execute: async ({ sock, m, from }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    const setPath = path.join(__dirname, '..', 'data', 'group_settings.json');
    const data = JSON.parse(fs.readFileSync(setPath, 'utf8'));
    if (!data[from]) data[from] = {};
    data[from].adminalerts = !data[from].adminalerts;
    fs.writeFileSync(setPath, JSON.stringify(data, null, 2));
    await sock.sendMessage(from, { text: `✅ Admin Alerts are now *${data[from].adminalerts ? 'ON' : 'OFF'}*` }, { quoted: m });
  },
};
