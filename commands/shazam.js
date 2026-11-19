import { downloadMediaMessage } from '@whiskeysockets/baileys';
import axios from 'axios';
import FormData from 'form-data';

export default {
  execute: async ({ sock, m, from }) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted || !quoted.audioMessage) return sock.sendMessage(from, { text: '❌ Reply to a voice note or audio file.' }, { quoted: m });

    await sock.sendMessage(from, { text: '🎵 Listening to audio...' }, { quoted: m });

    try {
      const buffer = await downloadMediaMessage({ message: quoted, key: m.key }, 'buffer', {}, {});
      const form = new FormData();
      form.append('file', buffer, { filename: 'audio.mp3' });

      // Using a public Shazam API
      const res = await axios.post('https://api.ryzendesu.vip/api/tools/shazam', form, {
        headers: form.getHeaders()
      });

      if (!res.data || !res.data.title) throw new Error('Song not recognized');

      const text = `🎵 *SHAZAM RESULT*\n\n` +
        `📝 *Title:* ${res.data.title}\n` +
        `🎤 *Artist:* ${res.data.artist}\n` +
        `💿 *Album:* ${res.data.album || 'Unknown'}`;
        
      await sock.sendMessage(from, { image: { url: res.data.cover }, caption: text }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Could not recognize the song.` }, { quoted: m });
    }
  },
};
