export default {
  execute: async ({ sock, m, from, args }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    const desc = args.join(' ');
    if (!desc) return sock.sendMessage(from, { text: '❌ Provide a new description.' }, { quoted: m });
    try {
      await sock.groupUpdateDescription(from, desc);
      await sock.sendMessage(from, { text: `✅ Group description updated.` }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed. Make sure the bot is admin.` }, { quoted: m });
    }
  },
};
