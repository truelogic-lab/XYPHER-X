export default {
  ownerOnly: true,
  execute: async ({ sock, m, from }) => {
    await sock.chatModify({ archive: false }, from);
    await sock.sendMessage(from, { text: '✅ Chat unarchived.' }, { quoted: m });
  },
};
