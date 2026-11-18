export default {
  execute: async ({ sock, m, from }) => {
    await sock.sendMessage(from, { text: '🟢 *System Online*\n\nThe bot is actively connected to WhatsApp and listening for commands.' }, { quoted: m });
  },
};
