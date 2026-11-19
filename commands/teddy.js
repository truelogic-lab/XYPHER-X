export default {
  execute: async ({ sock, m, from }) => {
    await sock.sendMessage(from, { text: `🧸 *TEDDY*\n\n(\\_/)\n(•,•)\n(")_(")\nHere is a teddy for you!` }, { quoted: m });
  }
};
