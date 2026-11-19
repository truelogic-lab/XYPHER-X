export default {
  execute: async ({ sock, m, from }) => {
    await sock.sendMessage(from, { text: `🤔 *QUESTION*\n\nIf you could have dinner with anyone, dead or alive, who would it be?` }, { quoted: m });
  }
};
