import { downloadMediaMessage } from '@whiskeysockets/baileys';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';

export default {
  aliases: ['s'],
  execute: async ({ sock, m, from }) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const msg = quoted || m.message;
    const type = Object.keys(msg)[0];

    if (!['imageMessage', 'videoMessage'].includes(type))
      return sock.sendMessage(from, { text: '❌ Reply to an image/video.' }, { quoted: m });

    const tmpIn = path.join(os.tmpdir(), `in_${Date.now()}`);
    const tmpOut = path.join(os.tmpdir(), `out_${Date.now()}.webp`);

    const buffer = await downloadMediaMessage({ message: msg, key: m.key }, 'buffer', {}, {});
    fs.writeFileSync(tmpIn, buffer);

    const vf = 'scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000';
    const cmd = type === 'imageMessage'
      ? `"${FFMPEG}" -i "${tmpIn}" -vf "${vf}" -c:v libwebp -preset default -loop 0 -an -vsync 0 "${tmpOut}"`
      : `"${FFMPEG}" -i "${tmpIn}" -vf "${vf},fps=15" -c:v libwebp -preset default -loop 0 -an -vsync 0 -t 5 "${tmpOut}"`;

    exec(cmd, async (err) => {
      if (err) {
        console.error(err);
        return sock.sendMessage(from, { text: '❌ Sticker failed.' }, { quoted: m });
      }
      await sock.sendMessage(from, { sticker: fs.readFileSync(tmpOut) }, { quoted: m });
      fs.unlinkSync(tmpIn);
      fs.unlinkSync(tmpOut);
    });
  },
};
