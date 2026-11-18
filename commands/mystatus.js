export default {
  execute: async ({ sock, m, from }) => {
    try {
      const status = await sock.fetchStatus(m.key.remoteJid);
      await sock.sendMessage(from, { text: `📝 *Status:* ${status.status || 'None'}` }, { quoted: m });
    } catch {
      await sock.sendMessage(from, { text: '❌ Could not fetch status.' }, { quoted: m });
    }
  },
};
