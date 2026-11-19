export default {
  execute: async ({ sock, m, from }) => {
    const result = Math.random() < 0.5 ? 'Heads 🪙' : 'Tails 🪙';
    await sock.sendMessage(from, { text: `🪙 Coin flip: *${result}*` }, { quoted: m });
  }
};
