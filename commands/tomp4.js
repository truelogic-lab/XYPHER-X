export default {
  execute: async ({ sock, m, from }) => {
    await sock.sendMessage(from, { text: '⚠️ Animated sticker to MP4 requires heavy processing. Coming soon!' }, { quoted: m });
  }
};
