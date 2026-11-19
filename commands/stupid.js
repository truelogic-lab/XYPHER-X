export default {
  execute: async ({ sock, m, from }) => {
    const percent = Math.floor(Math.random() * 100);
    await sock.sendMessage(from, { text: `🤪 *STUPID METER*\n\nYou are *${percent}%* stupid!` }, { quoted: m });
  }
};
