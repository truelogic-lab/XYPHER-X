export default {
  ownerOnly: true,
  execute: async ({ sock, m, from }) => {
    await sock.chatModify({ pin: true }, from);
    await sock.sendMessage(from, { text: '✅ Chat pinned.' }, { quoted: m });
  },
};
