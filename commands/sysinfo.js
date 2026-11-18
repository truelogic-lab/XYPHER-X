import os from 'node-os-utils';

export default {
  aliases: ['sys', 'stats'],
  execute: async ({ sock, m, from }) => {
    const cpu = await os.cpu.usage();
    const mem = await os.mem.info();
    const uptime = os.os.uptime();

    const text =
      `💻 *SYSTEM INFO*\n\n` +
      `⚙️ *CPU Usage:* ${cpu}%\n` +
      `🧠 *RAM Used:* ${mem.usedMemMb} MB / ${mem.totalMemMb} MB\n` +
      `⏱️ *Uptime:* ${Math.floor(uptime / 3600)} Hours\n`;

    await sock.sendMessage(from, { text }, { quoted: m });
  },
};
