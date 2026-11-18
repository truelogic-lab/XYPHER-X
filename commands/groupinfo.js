export default {
  execute: async ({ sock, m, from }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    try {
      const metadata = await sock.groupMetadata(from);
      const text = `📁 *GROUP INFO*\n\n` +
        `📝 *Name:* ${metadata.subject}\n` +
        `🆔 *ID:* ${metadata.id}\n` +
        `👥 *Members:* ${metadata.participants.length}\n` +
        `📅 *Created:* ${new Date(metadata.creation * 1000).toLocaleDateString()}\n` +
        `👑 *Creator:* @${metadata.owner?.split('@')[0] || 'Unknown'}\n\n` +
        `📄 *Description:*\n${metadata.desc || 'None'}`;
      await sock.sendMessage(from, { text, mentions: [metadata.owner] }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed to get info.` }, { quoted: m });
    }
  },
};
