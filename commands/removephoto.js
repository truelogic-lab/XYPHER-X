export default {
  ownerOnly: true,
  execute: async ({ sock, m, from }) => {
    try {
      await sock.removeProfilePicture(sock.user.id);
      await sock.sendMessage(from, { text: '✅ Bot profile picture removed.' }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed: ${e.message}` }, { quoted: m });
    }
  },
};
