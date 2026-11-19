import axios from 'axios';

export default {
  execute: async ({ sock, m, from, args }) => {
    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: '❌ Provide text for the quote card.' }, { quoted: m });

    try {
      const url = `https://api.ryzendesu.vip/api/maker/quote?text=${encodeURIComponent(text)}&author=XYPHER-X`;
      const res = await axios.get(url, { responseType: 'arraybuffer' });
      await sock.sendMessage(from, { image: Buffer.from(res.data) }, { quoted: m });
    } catch {
      await sock.sendMessage(from, { text: '❌ Quote card generation failed.' }, { quoted: m });
    }
  },
};
