import { downloadMediaMessage } from '@whiskeysockets/baileys';
import pkg from 'node-webpmux';
const { Image } = pkg;
import fs from 'fs';
import path from 'path';
import os from 'os';

export default {
  execute: async ({ sock, m, from, args }) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted || !quoted.stickerMessage) return sock.sendMessage(from, { text: '❌ Reply to a sticker.' }, { quoted: m });

    const packName = args.join(' ') || 'XYPHER-X';
    const author = 'Hector Manuel';

    try {
      let buffer = await downloadMediaMessage({ message: quoted, key: m.key }, 'buffer', {}, {});
      const tmpIn = path.join(os.tmpdir(), `in_${Date.now()}.webp`);
      fs.writeFileSync(tmpIn, buffer);

      const img = new Image();
      await img.load(tmpIn);
      
      img.exif = Buffer.from(JSON.stringify({
        "sticker-pack-id": "com.xyper.x",
        "sticker-pack-name": packName,
        "sticker-author": author,
        "emojis": ["🔥"]
      }));

      const newBuffer = await img.save(null);
      await sock.sendMessage(from, { sticker: newBuffer }, { quoted: m });
      fs.unlinkSync(tmpIn);
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed: ${e.message}` }, { quoted: m });
    }
  },
};
