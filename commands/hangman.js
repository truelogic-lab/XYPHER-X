const words = ['apple', 'monkey', 'guitar', 'oxygen', 'zebra'];
export default {
  execute: async ({ sock, m, from }) => {
    const word = words[Math.floor(Math.random() * words.length)];
    const display = word.split('').map(() => '_').join(' ');
    await sock.sendMessage(from, { text: `🎮 *HANGMAN*\n\nWord: ${display}\n\n(Full game state requires database, this is a starter!)` }, { quoted: m });
  }
};
