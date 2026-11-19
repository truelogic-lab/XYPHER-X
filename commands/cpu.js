import os from 'node-os-utils';
export default {
  execute: async ({ sock, m, from }) => {
    const cpu = await os.cpu.usage();
    const mem = await os.mem.info();
    await sock.sendMessage(from, { text: `💻 *SERVER STATS*\n\n⚙️ CPU: ${cpu}%\n🧠 RAM: ${mem.usedMemMb}MB / ${mem.totalMemMb}MB` }, { quoted: m });
  }
};
