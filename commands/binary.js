export default {
  execute: async ({ sock, m, from, args }) => {
    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: '❌ Provide text.' }, { quoted: m });
    const binary = text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    await sock.sendMessage(from, { text: `💻 *BINARY:*\n${binary}` }, { quoted: m });
  }
};
