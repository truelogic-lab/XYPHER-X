export default {
  execute: async ({ sock, m, from }) => {
    await sock.sendMessage(from, { text: `🌙 Goodnight! Sweet dreams. ✨` }, { quoted: m });
  }
};
