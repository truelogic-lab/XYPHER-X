import os from 'os';
export default {
  execute: async ({ sock, m, from }) => {
    await sock.sendMessage(from, { text: `💻 *DEVICE INFO*\n\nOS: ${os.platform()} ${os.arch()}\nHost: ${os.hostname()}\nCPU: ${os.cpus().length} Cores` }, { quoted: m });
  }
};
