export default {
  execute: async ({ sock, m, from }) => {
    const uptime = process.uptime();
    const text = `📈 *BOT STATS*\n\n` +
      `⏱️ Uptime: ${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m\n` +
      `💾 Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)} MB\n` +
      `🟢 Status: Connected`;
    await sock.sendMessage(from, { text }, { quoted: m });
  },
};
