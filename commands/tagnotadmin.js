export default {
  execute: async ({ sock, m, from, args }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    const metadata = await sock.groupMetadata(from);
    const members = metadata.participants.filter(p => p.admin === null).map(p => p.id);
    const text = args.join(' ') || 'Attention Members!';
    let tagText = `📢 *TAG NOT ADMIN*\n\n${text}\n\n`;
    members.forEach(mem => { tagText += `@${mem.split('@')[0]}\n`; });
    await sock.sendMessage(from, { text: tagText, mentions: members }, { quoted: m });
  },
};
