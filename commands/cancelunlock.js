export default {
  execute: async ({ sock, m, from }) => {
    await sock.sendMessage(from, { text: '✅ Scheduled unlock cancelled.' }, { quoted: m });
  },
};
