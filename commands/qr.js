import axios from 'axios';

export default {
  aliases: ['qrcode'],
  execute: async ({ sock, m, from, args }) => {
    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: '❌ Provide text or a link to generate a QR code.' }, { quoted: m });

    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}`;
      const res = await axios.get(qrUrl, { responseType: 'arraybuffer' });
      
      await sock.sendMessage(from, { image: Buffer.from(res.data), caption: `🔳 *QR Code for:* ${text}` }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed to generate QR code.` }, { quoted: m });
    }
  },
};
