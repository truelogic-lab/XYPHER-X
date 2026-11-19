import axios from 'axios';

export default {
  execute: async ({ sock, m, from, args }) => {
    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: '❌ Provide text.' }, { quoted: m });

    try {
      const url = `https://api.ryzendesu.vip/api/maker/brat?text=${encodeURIComponent(text)}`;
      const res = await axios.get(url, { responseType: 'arraybuffer' });
      await sock.sendMessage(from, { sticker: Buffer.from(res.data) }, { quoted: m });
    } catch {
      await sock.sendMessage(from, { text: '❌ Brat generation failed.' }, { quoted: m });
    }
  },
};
