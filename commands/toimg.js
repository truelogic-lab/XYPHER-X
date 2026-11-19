import { downloadMediaMessage } from '@whiskeysockets/baileys';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

export default {
  execute: async ({ sock, m, from }) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted || !quoted.stickerMessage) return sock.sendMessage(from, { text: '❌ Reply to a sticker.' }, { quoted: m });

    const tmpIn = path.join(os.tmpdir(), `in_${Date.now()}.webp`);
    const tmpOut = path.join(os.tmpdir(), `out_${Date.now()}.png`);

    const buffer = await downloadMediaMessage({ message: quoted, key: m.key }, 'buffer', {}, {});
    fs.writeFileSync(tmpIn, buffer);

    exec(`ffmpeg -i "${tmpIn}" "${tmpOut}"`, async (err) => {
      if (err) return sock.sendMessage(from, { text: '❌ Conversion failed.' }, { quoted: m });
      await sock.sendMessage(from, { image: fs.readFileSync(tmpOut), caption: '✅ Converted!' }, { quoted: m });
      fs.unlinkSync(tmpIn); fs.unlinkSync(tmpOut);
    });
  },
};
