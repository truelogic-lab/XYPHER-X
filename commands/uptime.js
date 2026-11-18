export default {
  execute: async ({ sock, m, from, settings }) => {
    const uptime = process.uptime();
    const h = Math.floor(uptime / 3600);
    const min = Math.floor((uptime % 3600) / 60);
    const s = Math.floor(uptime % 60);
    
    const text = `⏱️ *${settings.botName} UPTIME*\n\n` +
      `🕐 *Running for:* ${h} hours, ${min} minutes, ${s} seconds.`;
      
    await sock.sendMessage(from, { text }, { quoted: m });
  },
};
