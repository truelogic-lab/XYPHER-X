export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, args }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ This command only works in groups.' }, { quoted: m });
    const target = args[0]?.replace(/\D/g, '') + '@s.whatsapp.net';
    if (!target || target === 'undefined@s.whatsapp.net') return sock.sendMessage(from, { text: '❌ Provide a number.' }, { quoted: m });
    try {
      await sock.groupParticipantsUpdate(from, [target], 'add');
      await sock.sendMessage(from, { text: `✅ Added ${target.split('@')[0]} to the group.` }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed to add: ${e.message}` }, { quoted: m });
    }
  },
};
