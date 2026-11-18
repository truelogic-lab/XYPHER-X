export default {
  execute: async ({ sock, m, from, args }) => {
    const text = args.join(' ');
    if (!text.includes(';')) return sock.sendMessage(from, { text: '❌ Usage: .poll Question ; Option1 ; Option2' }, { quoted: m });
    const [question, ...options] = text.split(';').map(s => s.trim());
    try {
      await sock.sendMessage(from, {
        poll: {
          name: question,
          values: options,
          selectableCount: 1
        }
      }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: '❌ Failed to create poll.' }, { quoted: m });
    }
  },
};
