export default {
  execute: async ({ sock, m, from }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    await sock.sendMessage(from, { text: '👋 Goodbye everyone!' }, { quoted: m });
    await sock.groupLeave(from);
  },
};
