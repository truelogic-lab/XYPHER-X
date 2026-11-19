export default {
  execute: async ({ sock, m, from }) => {
    const percent = Math.floor(Math.random() * 100);
    await sock.sendMessage(from, { text: `😍 *SIMP METER*\n\nYou are *${percent}%* simp!` }, { quoted: m });
  }
};
