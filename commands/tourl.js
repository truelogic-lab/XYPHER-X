import { downloadMediaMessage } from '@whiskeysockets/baileys';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import os from 'os';
import path from 'path';

export default {
  execute: async ({ sock, m, from }) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted) return sock.sendMessage(from, { text: '❌ Reply to an image, video, or audio.' }, { quoted: m });

    const type = Object.keys(quoted)[0];
    if (!['imageMessage', 'videoMessage', 'audioMessage', 'documentMessage'].includes(type)) {
      return sock.sendMessage(from, { text: '❌ That media type is not supported.' }, { quoted: m });
    }

    await sock.sendMessage(from, { text: '⏳ Uploading to cloud...' }, { quoted: m });

    try {
      const buffer = await downloadMediaMessage({ message: quoted, key: m.key }, 'buffer', {}, {});
      const tmpPath = path.join(os.tmpdir(), `upload_${Date.now()}`);
      fs.writeFileSync(tmpPath, buffer);

      const form = new FormData();
      form.append('files[]', fs.createReadStream(tmpPath));

      // Using Uguu.se (A very reliable, no-auth file host)
      const res = await axios.post('https://uguu.se/upload.php', form, {
        headers: form.getHeaders()
      });

      fs.unlinkSync(tmpPath);

      if (!res.data || !res.data.files || !res.data.files[0]) {
        throw new Error('Upload failed, API returned no URL');
      }

      const fileUrl = res.data.files[0].url;
      await sock.sendMessage(from, { text: `☁️ *UPLOAD SUCCESS*\n\n🔗 *URL:* ${fileUrl}` }, { quoted: m });

    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Error: ${e.message}. Try again in a moment.` }, { quoted: m });
    }
  },
};
