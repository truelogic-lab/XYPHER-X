import { downloadMediaMessage } from '@whiskeysockets/baileys';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

export default {
  execute: async ({ sock, m, from }) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted || !quoted.imageMessage) return sock.sendMessage(from, { text: '❌ Reply to an image.' }, { quoted: m });

    const tmpIn = path.join(os.tmpdir(), `in_${Date.now()}`);
    const tmpOut = path.join(os.tmpdir(), `out_${Date.now()}.webp`);
    const buffer = await downloadMediaMessage({ message: quoted, key: m.key }, 'buffer', {}, {});
    fs.writeFileSync(tmpIn, buffer);

    const cmd = `ffmpeg -i "${tmpIn}" -vf "scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000" -c:v libwebp -preset default -loop 0 -an -vsync 0 "${tmpOut}"`;
    exec(cmd, async (err) => {
      if (err) return sock.sendMessage(from, { text: '❌ Failed to convert.' }, { quoted: m });
      await sock.sendMessage(from, { sticker: fs.readFileSync(tmpOut) }, { quoted: m });
      fs.unlinkSync(tmpIn); fs.unlinkSync(tmpOut);
    });
  },
};
