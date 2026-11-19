import axios from 'axios';

export default {
  execute: async ({ sock, m, from, args }) => {
    const text = args.join(' ');
    if (!text || !text.includes(';')) return sock.sendMessage(from, { text: '❌ Usage: .meme Top Text ; Bottom Text' }, { quoted: m });

    const [top, bottom] = text.split(';');
    try {
      const url = `https://api.memegen.link/images/custom/${encodeURIComponent(top.trim() || '_')}/${encodeURIComponent(bottom.trim() || '_')}.png?background=https://i.imgur.com/3K3B1rS.jpeg`;
      const res = await axios.get(url, { responseType: 'arraybuffer' });
      await sock.sendMessage(from, { image: Buffer.from(res.data) }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: '❌ Failed to generate meme.' }, { quoted: m });
    }
  },
};
