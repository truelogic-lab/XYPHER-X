export default {
  execute: async ({ sock, m, from }) => {
    const now = new Date();
    const text = `🕐 *CURRENT TIMESTAMP*\n\n` +
      `📅 *Date:* ${now.toDateString()}\n` +
      `⏰ *Time:* ${now.toLocaleTimeString()}\n` +
      `🔢 *Unix:* ${Math.floor(now.getTime() / 1000)}`;
    await sock.sendMessage(from, { text }, { quoted: m });
  },
};
