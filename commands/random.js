export default {
  execute: async ({ sock, m, from, args }) => {
    const min = parseInt(args[0]) || 1; const max = parseInt(args[1]) || 100;
    await sock.sendMessage(from, { text: `🎯 *Random Number (${min}-${max}):* ${Math.floor(Math.random() * (max - min + 1)) + min}` }, { quoted: m });
  }
};
