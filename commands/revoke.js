export default {
  execute: async ({ sock, m, from }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    try {
      await sock.groupRevokeInvite(from);
      await sock.sendMessage(from, { text: `✅ Group link has been reset. Previous link is now invalid.` }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed. Make sure the bot is admin.` }, { quoted: m });
    }
  },
};
