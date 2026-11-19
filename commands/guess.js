export default {
  execute: async ({ sock, m, from }) => {
    const num = Math.floor(Math.random() * 10) + 1;
    await sock.sendMessage(from, { text: `🎮 *GUESS THE NUMBER*\n\nI am thinking of a number between 1 and 10. Reply with your guess! (Hint: It's ${num})` }, { quoted: m });
  }
};
