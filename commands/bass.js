import { downloadMediaMessage } from '@whiskeysockets/baileys';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

export default {
  execute: async ({ sock, m, from }) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted || (!quoted.audioMessage && !quoted.voiceMessage)) return sock.sendMessage(from, { text: '❌ Reply to an audio/voice note.' }, { quoted: m });

    const tmpIn = path.join(os.tmpdir(), `in_${Date.now()}.mp3`);
    const tmpOut = path.join(os.tmpdir(), `out_${Date.now()}.mp3`);
    
    try {
      const buffer = await downloadMediaMessage({ message: quoted, key: m.key }, 'buffer', {}, {});
      fs.writeFileSync(tmpIn, buffer);

      // Apply Bass Boost
      const cmd = `ffmpeg -i "${tmpIn}" -af "bass=g=15,dynaudnorm=f=200" "${tmpOut}"`;
      exec(cmd, async (err) => {
        if (err) return sock.sendMessage(from, { text: '❌ Audio processing failed.' }, { quoted: m });
        await sock.sendMessage(from, { audio: fs.readFileSync(tmpOut), mimetype: 'audio/mp4' }, { quoted: m });
        fs.unlinkSync(tmpIn); fs.unlinkSync(tmpOut);
      });
    } catch (e) {
      await sock.sendMessage(from, { text: '❌ Failed to process audio.' }, { quoted: m });
    }
  },
};
