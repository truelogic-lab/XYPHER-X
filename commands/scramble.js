const words = ['apple', 'banana', 'orange', 'grapes', 'computer'];
export default {
  execute: async ({ sock, m, from }) => {
    const word = words[Math.floor(Math.random() * words.length)];
    const scrambled = word.split('').sort(() => 0.5 - Math.random()).join('');
    await sock.sendMessage(from, { text: `🧩 *WORD SCRAMBLE*\n\nUnscramble: *${scrambled.toUpperCase()}*` }, { quoted: m });
  }
};
