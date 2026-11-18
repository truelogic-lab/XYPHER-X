export default {
  ownerOnly: true,
  execute: async ({ sock, m, from }) => {
    await sock.chatModify({ archive: true }, from);
    await sock.sendMessage(from, { text: '✅ Chat archived.' }, { quoted: m });
  },
};
