import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  ownerOnly: true,
  aliases: ['delprefix'],
  execute: async ({ sock, m, from, args, settings }) => {
    let newPrefix = args[0];
    if (!newPrefix) {
      return sock.sendMessage(from, { text: '❌ Usage: .setprefix <new_prefix> (or .delprefix to reset)' }, { quoted: m });
    }

    if (m.text?.startsWith(settings.prefix + 'delprefix')) {
      newPrefix = '.';
    }

    const dataPath = path.join(__dirname, '..', 'data', 'owner.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    data.prefix = newPrefix;
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    await sock.sendMessage(from, { text: `✅ Prefix changed to *${newPrefix}*` }, { quoted: m });
  },
};
