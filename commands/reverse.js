export default {
  execute: async ({ sock, m, from, args }) => {
    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: '❌ Provide text to reverse.' }, { quoted: m });
    const reversed = text.split('').reverse().join('');
    await sock.sendMessage(from, { text: `🔄 *Reversed:*\n${reversed}` }, { quoted: m });
  },
};
