const words = ['crane', 'slate', 'audio', 'roast', 'adieu'];
export default {
  execute: async ({ sock, m, from }) => {
    const word = words[Math.floor(Math.random() * words.length)];
    await sock.sendMessage(from, { text: `🟩 *WORDLE*\n\nI have chosen a 5-letter word. Try guessing it! (Starter version)` }, { quoted: m });
  }
};
