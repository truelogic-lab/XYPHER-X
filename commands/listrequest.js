export default {
  execute: async ({ sock, m, from }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    const requests = await sock.groupRequestParticipantsList(from);
    if (!requests.length) return sock.sendMessage(from, { text: '❌ No pending requests.' }, { quoted: m });
    let text = `📋 *PENDING REQUESTS (${requests.length})*\n\n`;
    requests.forEach((r, i) => { text += `${i + 1}. @${r.jid.split('@')[0]}\n`; });
    await sock.sendMessage(from, { text, mentions: requests.map(r => r.jid) }, { quoted: m });
  },
};
