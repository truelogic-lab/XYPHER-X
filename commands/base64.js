export default {
  execute: async ({ sock, m, from, args }) => {
    const action = args[0]?.toLowerCase();
    const text = args.slice(1).join(' ');
    if (!action || !text) return sock.sendMessage(from, { text: '❌ Usage: .base64 encode <text> OR .base64 decode <hash>' }, { quoted: m });

    try {
      if (action === 'encode') {
        const encoded = Buffer.from(text).toString('base64');
        await sock.sendMessage(from, { text: `🔐 *Encoded:*\n${encoded}` }, { quoted: m });
      } else if (action === 'decode') {
        const decoded = Buffer.from(text, 'base64').toString('utf-8');
        await sock.sendMessage(from, { text: `🔓 *Decoded:*\n${decoded}` }, { quoted: m });
      } else {
        await sock.sendMessage(from, { text: '❌ Action must be "encode" or "decode".' }, { quoted: m });
      }
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Invalid input.` }, { quoted: m });
    }
  },
};
