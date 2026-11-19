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
    const tmpOut = path.join(os.tmpdir(), `out_${Date.now()}.jpg`);
    
    const buffer = await downloadMediaMessage({ message: quoted, key: m.key }, 'buffer', {}, {});
    fs.writeFileSync(tmpIn, buffer);

    exec(`ffmpeg -i "${tmpIn}" -vf "boxblur=5:1" "${tmpOut}"`, async (err) => {
      if (err) return sock.sendMessage(from, { text: '❌ Failed to blur image.' }, { quoted: m });
      await sock.sendMessage(from, { image: fs.readFileSync(tmpOut), caption: '🌫️ Blurred Image' }, { quoted: m });
      fs.unlinkSync(tmpIn); fs.unlinkSync(tmpOut);
    });
  },
};
