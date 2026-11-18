export default {
  execute: async ({ sock, m, from }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    const metadata = await sock.groupMetadata(from);
    const admins = metadata.participants.filter(p => p.admin !== null);
    let text = `👑 *ACTIVE ADMINS*\n\n`;
    admins.forEach(a => { text += `• @${a.id.split('@')[0]}\n`; });
    await sock.sendMessage(from, { text, mentions: admins.map(a => a.id) }, { quoted: m });
  },
};
