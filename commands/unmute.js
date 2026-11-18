export default {
  execute: async ({ sock, m, from }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    try {
      await sock.groupSettingUpdate(from, 'not_announcement');
      await sock.sendMessage(from, { text: '🔊 Group has been unmuted (Everyone can send messages).' }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed. Make sure the bot is admin.` }, { quoted: m });
    }
  },
};
