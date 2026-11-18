export default {
  ownerOnly: true,
  execute: async ({ sock, m, from }) => {
    await sock.chatModify({ markRead: false }, from);
    await sock.sendMessage(from, { text: '✅ Chat marked as unread.' }, { quoted: m });
  },
};
