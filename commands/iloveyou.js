export default {
  execute: async ({ sock, m, from }) => {
    await sock.sendMessage(from, { text: `❤️ I love you so much! You are the best!` }, { quoted: m });
  }
};
