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
    const tmpOut = path.join(os.tmpdir(), `out_${Date.now()}.png`);
    const buffer = await downloadMediaMessage({ message: quoted, key: m.key }, 'buffer', {}, {});
    fs.writeFileSync(tmpIn, buffer);

    // FFmpeg command to crop into a circle and make background transparent
    const cmd = `ffmpeg -i "${tmpIn}" -vf "crop='min(iw,ih)':'min(iw,ih)',scale=500:500,format=rgba,geq=r='r(X,Y)':a='if(gt(sqrt((X-250)^2+(Y-250)^2),250),0,255)'" "${tmpOut}"`;
    
    exec(cmd, async (err) => {
      if (err) return sock.sendMessage(from, { text: '❌ Failed to make round image.' }, { quoted: m });
      await sock.sendMessage(from, { image: fs.readFileSync(tmpOut), caption: '⭕ Round Image' }, { quoted: m });
      fs.unlinkSync(tmpIn); fs.unlinkSync(tmpOut);
    });
  },
};
