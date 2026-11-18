export default {
  execute: async ({ sock, m, from, args }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    let target = m.message.extendedTextMessage?.contextInfo?.participant || (args[0] ? args[0].replace(/\D/g, '') + '@s.whatsapp.net' : null);
    if (!target) return sock.sendMessage(from, { text: '❌ Tag someone or provide a number.' }, { quoted: m });

    try {
      const targetNumber = target.split('@')[0].split(':')[0];
      const res = await sock.groupParticipantsUpdate(from, [target], 'add');
      
      if (res && res[0]?.status === '403') {
        return sock.sendMessage(from, { text: `❌ Cannot add @${targetNumber}. Their privacy settings block group adds.`, mentions: [target] }, { quoted: m });
      }

      await sock.sendMessage(from, { text: `✅ Added @${targetNumber} to the group.`, mentions: [target] }, { quoted: m });
    } catch (e) {
      console.error("Add error:", e);
      if (e.message.includes('403') || e.message.includes('not-authorized')) {
        await sock.sendMessage(from, { text: `❌ I am *not an admin*.` }, { quoted: m });
      } else {
        await sock.sendMessage(from, { text: `❌ Failed to add: ${e.message}` }, { quoted: m });
      }
    }
  },
};
