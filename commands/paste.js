import axios from 'axios';
export default {
  execute: async ({ sock, m, from, args }) => {
    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: '❌ Provide text to paste.' }, { quoted: m });
    try {
      const res = await axios.post('https://paste.rs/', text);
      await sock.sendMessage(from, { text: `📋 *PASTEBIN*\n\n🔗 ${res.data}` }, { quoted: m });
    } catch { await sock.sendMessage(from, { text: '❌ Failed to paste.' }, { quoted: m }); }
  }
};
