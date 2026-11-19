export default {
  execute: async ({ sock, m, from, args }) => {
    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: '❌ Provide text.' }, { quoted: m });

    const upper = text.toUpperCase();
    const lower = text.toLowerCase();
    const title = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

    const res = `🔤 *CASE CONVERTER*\n\n🔠 *UPPER:* ${upper}\n🔡 *lower:* ${lower}\n🔠 *Title:* ${title}`;
    await sock.sendMessage(from, { text: res }, { quoted: m });
  },
};
