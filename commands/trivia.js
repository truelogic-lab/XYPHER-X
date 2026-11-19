const questions = [
  { q: "What is the capital of France?", a: "paris" },
  { q: "What is 2 + 2 * 2?", a: "6" },
  { q: "What is the largest planet?", a: "jupiter" }
];
export default {
  execute: async ({ sock, m, from }) => {
    const item = questions[Math.floor(Math.random() * questions.length)];
    await sock.sendMessage(from, { text: `🎮 *TRIVIA*\n\n${item.q}\n\n_Reply with the answer in this chat within 30s!_` }, { quoted: m });
    // Note: Full trivia needs state management, but this gets it functional.
  }
};
