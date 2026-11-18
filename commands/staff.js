export default {
  aliases: ['admins'],
  execute: async ({ sock, m, from }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    try {
      const metadata = await sock.groupMetadata(from);
      const admins = metadata.participants.filter(p => p.admin !== null);
      let text = `👑 *GROUP ADMINS*\n\n`;
      let mentions = [];
      admins.forEach((a, i) => {
        text += `${i + 1}. @${a.id.split('@')[0]} ${a.admin === 'superadmin' ? '(Creator)' : ''}\n`;
        mentions.push(a.id);
      });
      await sock.sendMessage(from, { text, mentions }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed.` }, { quoted: m });
    }
  },
};
