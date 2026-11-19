import axios from 'axios';
export default {
  execute: async ({ sock, m, from, args }) => {
    if (args.length < 2) return sock.sendMessage(from, { text: '❌ Usage: .emojimix 😀 😎' }, { quoted: m });
    try {
      const res = await axios.get(`https://api.popcat.xyz/emojimix?emoji1=${encodeURIComponent(args[0])}&emoji2=${encodeURIComponent(args[1])}`, { responseType: 'arraybuffer' });
      await sock.sendMessage(from, { sticker: Buffer.from(res.data) }, { quoted: m });
    } catch { await sock.sendMessage(from, { text: '❌ Invalid emojis or API failed.' }, { quoted: m }); }
  }
};
