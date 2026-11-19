export default {
  execute: async ({ sock, m, from }) => {
    await sock.sendMessage(from, { text: `✨ *QUOTE*\n\n"Believe you can and you're halfway there." - Theodore Roosevelt` }, { quoted: m });
  }
};
