import { downloadMediaMessage } from '@whiskeysockets/baileys';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

export default {
  execute: async ({ sock, m, from }) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted || (!quoted.audioMessage && !quoted.voiceMessage)) return sock.sendMessage(from, { text: '❌ Reply to audio.' }, { quoted: m });

    const tmpIn = path.join(os.tmpdir(), `in_${Date.now()}.mp3`);
    const tmpOut = path.join(os.tmpdir(), `out_${Date.now()}.mp3`);
    const buffer = await downloadMediaMessage({ message: quoted, key: m.key }, 'buffer', {}, {});
    fs.writeFileSync(tmpIn, buffer);

    // Robot effect
    exec(`ffmpeg -i "${tmpIn}" -af "afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)'" "${tmpOut}"`, async (err) => {
      if (err) return sock.sendMessage(from, { text: '❌ Failed.' }, { quoted: m });
      await sock.sendMessage(from, { audio: fs.readFileSync(tmpOut), mimetype: 'audio/mp4' }, { quoted: m });
      fs.unlinkSync(tmpIn); fs.unlinkSync(tmpOut);
    });
  },
};
