export default {
  execute: async ({ sock, m, from }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    try {
      const code = await sock.groupInviteCode(from);
      await sock.sendMessage(from, { text: `🔗 *Group Link:*\nhttps://chat.whatsapp.com/${code}` }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed. Make sure the bot is admin.` }, { quoted: m });
    }
  },
};
