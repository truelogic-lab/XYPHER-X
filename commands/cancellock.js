export default {
  execute: async ({ sock, m, from }) => {
    await sock.sendMessage(from, { text: '✅ Scheduled lock/unlock has been cancelled (Note: Requires bot restart to clear timers properly).' }, { quoted: m });
  },
};
