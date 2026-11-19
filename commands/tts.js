import gTTS from 'google-tts-api';
import axios from 'axios';

export default {
  execute: async ({ sock, m, from, args }) => {
    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: '❌ Provide text to convert to speech.' }, { quoted: m });

    try {
      const url = gTTS.getAudioUrl(text, { lang: 'en', slow: false, host: 'https://translate.google.com' });
      const res = await axios.get(url, { responseType: 'arraybuffer' });
      await sock.sendMessage(from, { audio: Buffer.from(res.data), mimetype: 'audio/mp4' }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: '❌ TTS failed. Text might be too long.' }, { quoted: m });
    }
  },
};
