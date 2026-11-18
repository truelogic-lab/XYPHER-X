export default {
  execute: async ({ sock, m, from, args }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    let target = m.message.extendedTextMessage?.contextInfo?.participant || (args[0] ? args[0].replace(/\D/g, '') + '@s.whatsapp.net' : null);
    if (!target) return sock.sendMessage(from, { text: '❌ Tag someone.' }, { quoted: m });

    try {
      const metadata = await sock.groupMetadata(from);
      const participant = metadata.participants.find(p => p.id === target || p.lid === target);
      
      let cleanNumber;
      if (participant) {
        const rawId = participant.phoneNumber || participant.id; 
        cleanNumber = rawId.split('@')[0].split(':')[0];
      } else {
        cleanNumber = target.split('@')[0].split(':')[0];
      }
      
      const jid = `${cleanNumber}@s.whatsapp.net`;

      await sock.groupParticipantsUpdate(from, [jid], 'promote');
      await sock.sendMessage(from, { text: `👑 Promoted @${cleanNumber} to Admin.`, mentions: [jid] }, { quoted: m });
    } catch (e) {
      console.error("Promote error:", e);
      if (e.message.includes('403') || e.message.includes('not-authorized')) {
        await sock.sendMessage(from, { text: `❌ I am *not an admin*.` }, { quoted: m });
      } else {
        await sock.sendMessage(from, { text: `❌ Failed: ${e.message}` }, { quoted: m });
      }
    }
  },
};
