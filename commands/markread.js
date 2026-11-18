export default {
  ownerOnly: true,
  execute: async ({ sock, m, from }) => {
    await sock.chatModify({ markRead: true }, from);
    await sock.sendMessage(from, { text: '✅ Chat marked as read.' }, { quoted: m });
  },
};
