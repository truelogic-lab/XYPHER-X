export default {
  execute: async ({ sock, m, from }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    const requests = await sock.groupRequestParticipantsList(from);
    if (!requests.length) return sock.sendMessage(from, { text: '❌ No pending requests.' }, { quoted: m });
    const jids = requests.map(r => r.jid);
    await sock.groupRequestParticipantsUpdate(from, jids, 'approve');
    await sock.sendMessage(from, { text: `✅ Accepted ${jids.length} join requests.` }, { quoted: m });
  },
};
