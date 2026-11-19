export default {
  execute: async ({ sock, m, from }) => {
    const result = Math.floor(Math.random() * 6) + 1;
    await sock.sendMessage(from, { text: `🎲 You rolled a *${result}*!` }, { quoted: m });
  }
};
