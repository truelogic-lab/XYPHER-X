export default {
  execute: async ({ sock, m, from }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    const metadata = await sock.groupMetadata(from);
    const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
    const toKick = metadata.participants.filter(p => p.id !== botId && p.admin === null).map(p => p.id);
    if (!toKick.length) return sock.sendMessage(from, { text: '❌ No members to kick.' }, { quoted: m });
    
    await sock.sendMessage(from, { text: `⚠️ Kicking ${toKick.length} members...` });
    for (const target of toKick) {
      await sock.groupParticipantsUpdate(from, [target], 'remove').catch(() => {});
      await new Promise(r => setTimeout(r, 500)); // delay to avoid ban
    }
  },
};
