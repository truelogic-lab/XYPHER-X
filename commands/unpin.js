export default {
  ownerOnly: true,
  execute: async ({ sock, m, from }) => {
    await sock.chatModify({ pin: false }, from);
    await sock.sendMessage(from, { text: '✅ Chat unpinned.' }, { quoted: m });
  },
};
