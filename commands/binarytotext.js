export default {
  execute: async ({ sock, m, from, args }) => {
    const binary = args.join(' ');
    if (!binary) return sock.sendMessage(from, { text: '❌ Provide binary.' }, { quoted: m });
    try {
      const text = binary.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
      await sock.sendMessage(from, { text: `📝 *TEXT:*\n${text}` }, { quoted: m });
    } catch { await sock.sendMessage(from, { text: '❌ Invalid binary.' }, { quoted: m }); }
  }
};
