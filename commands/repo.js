export default {
  execute: async ({ sock, m, from, settings }) => {
    const text = `💻 *${settings.botName} SOURCE CODE*\n\n` +
      `🌐 *Website:* https://xyper-x.com\n` +
      `📂 *GitHub:* https://github.com/truelogic-lab\n\n` +
      `> Don't forget to leave a ⭐ on the repo!`;
      
    await sock.sendMessage(from, { text }, { quoted: m });
  },
};
