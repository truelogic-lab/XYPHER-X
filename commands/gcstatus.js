export default {
  execute: async ({ sock, m, from }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    try {
      const metadata = await sock.groupMetadata(from);
      const isLocked = metadata.announce;
      const text = `📊 *GROUP STATUS*\n\n` +
        `🔒 *Locked:* ${isLocked ? 'Yes (Admins Only)' : 'No (Everyone can chat)'}\n` +
        `👥 *Members:* ${metadata.participants.length}\n` +
        `📝 *Name:* ${metadata.subject}`;
      await sock.sendMessage(from, { text }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: '❌ Failed to fetch group status.' }, { quoted: m });
    }
  },
};
