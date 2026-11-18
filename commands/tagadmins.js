export default {
  execute: async ({ sock, m, from, args }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    try {
      const metadata = await sock.groupMetadata(from);
      const admins = metadata.participants.filter(p => p.admin !== null).map(p => p.id);
      const text = args.join(' ') || 'Attention Admins!';
      
      let tagText = `👑 *TAG ADMINS*\n\n*Message:* ${text}\n\n`;
      admins.forEach(a => { tagText += `@${a.split('@')[0]}\n`; });
      
      await sock.sendMessage(from, { text: tagText, mentions: admins }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed.` }, { quoted: m });
    }
  },
};
