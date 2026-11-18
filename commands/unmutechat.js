export default {
  ownerOnly: true,
  execute: async ({ sock, m, from }) => {
    await sock.chatModify({ mute: null }, from);
    await sock.sendMessage(from, { text: '✅ Chat unmuted.' }, { quoted: m });
  },
};
