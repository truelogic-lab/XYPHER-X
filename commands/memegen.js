import axios from 'axios';
export default {
  execute: async ({ sock, m, from, args }) => {
    const text = args.join(' ');
    if (!text || !text.includes(';')) return sock.sendMessage(from, { text: '❌ Usage: .memegen Top ; Bottom' }, { quoted: m });
    const [top, bottom] = text.split(';');
    try {
      const url = `https://api.memegen.link/images/custom/${encodeURIComponent(top.trim() || '_')}/${encodeURIComponent(bottom.trim() || '_')}.png?background=https://i.imgur.com/3K3B1rS.jpeg`;
      await sock.sendMessage(from, { image: { url } }, { quoted: m });
    } catch { await sock.sendMessage(from, { text: '❌ Failed.' }, { quoted: m }); }
  }
};
