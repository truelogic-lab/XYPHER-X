export default {
  execute: async ({ sock, m, from }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    await sock.groupSettingUpdate(from, 'announcement');
    await sock.sendMessage(from, { text: '🔒 Group locked (Only admins can message).' }, { quoted: m });
  },
};
