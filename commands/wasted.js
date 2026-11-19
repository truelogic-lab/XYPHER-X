import { downloadMediaMessage } from '@whiskeysockets/baileys';
import axios from 'axios';
import FormData from 'form-data';

export default {
  execute: async ({ sock, m, from }) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted || !quoted.imageMessage) return sock.sendMessage(from, { text: '❌ Reply to an image.' }, { quoted: m });

    await sock.sendMessage(from, { text: '⏳ Applying Wasted filter...' }, { quoted: m });
    
    try {
      const buffer = await downloadMediaMessage({ message: quoted, key: m.key }, 'buffer', {}, {});
      const form = new FormData();
      form.append('file', buffer, { filename: 'image.jpg' });

      const res = await axios.post('https://api.ryzendesu.vip/api/canvas/wasted', form, { headers: form.getHeaders() });
      
      if (!res.data || !res.data.url) throw new Error('Failed');

      await sock.sendMessage(from, { image: { url: res.data.url } }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed to apply filter.` }, { quoted: m });
    }
  },
};
