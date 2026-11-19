import axios from 'axios';

export default {
  aliases: ['attp'],
  execute: async ({ sock, m, from, args }) => {
    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: '❌ Provide text to convert to a picture.' }, { quoted: m });

    try {
      const url = `https://api.popcat.xyz/opinion?text=${encodeURIComponent(text)}`;
      const res = await axios.get(url, { responseType: 'arraybuffer' });
      await sock.sendMessage(from, { image: Buffer.from(res.data), caption: '🖼️ Text to Image' }, { quoted: m });
    } catch {
      await sock.sendMessage(from, { text: '❌ Failed to generate image.' }, { quoted: m });
    }
  },
};
