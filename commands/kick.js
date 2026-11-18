export default {
  execute: async ({ sock, m, from, args }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    
    let target = m.message.extendedTextMessage?.contextInfo?.participant || (args[0] ? args[0].replace(/\D/g, '') + '@s.whatsapp.net' : null);
    if (!target) return sock.sendMessage(from, { text: '❌ Tag someone.' }, { quoted: m });

    try {
      const metadata = await sock.groupMetadata(from);
      
      // 🔍 FIND USER & EXTRACT REAL PHONE NUMBER
      const participant = metadata.participants.find(p => p.id === target || p.lid === target);
      
      let cleanNumber;
      if (participant) {
        // Use phoneNumber if it exists, otherwise use id
        const rawId = participant.phoneNumber || participant.id; 
        cleanNumber = rawId.split('@')[0].split(':')[0]; // Extract only the digits
      } else {
        cleanNumber = target.split('@')[0].split(':')[0];
      }
      
      const jid = `${cleanNumber}@s.whatsapp.net`; // Force standard format

      if (participant?.admin === 'superadmin') return sock.sendMessage(from, { text: '❌ I cannot kick the Group Creator.' }, { quoted: m });
      if (participant?.admin === 'admin') return sock.sendMessage(from, { text: '❌ I cannot kick another Admin.' }, { quoted: m });

      // Use the clean JID to kick
      await sock.groupParticipantsUpdate(from, [jid], 'remove');
      await sock.sendMessage(from, { text: `✅ Kicked @${cleanNumber} from the group.`, mentions: [jid] }, { quoted: m });
    } catch (e) {
      console.error("Kick error:", e);
      if (e.message.includes('403') || e.message.includes('not-authorized')) {
        await sock.sendMessage(from, { text: `❌ I am *not an admin*.` }, { quoted: m });
      } else {
        await sock.sendMessage(from, { text: `❌ Failed to kick: ${e.message}` }, { quoted: m });
      }
    }
  },
};
