export default {
  execute: async ({ sock, m, from, args }) => {
    let target = m.message?.extendedTextMessage?.contextInfo?.participant || args[0]?.replace(/\D/g, '') + '@s.whatsapp.net';
    if (!target || target === 'undefined@s.whatsapp.net') return sock.sendMessage(from, { text: '❌ Reply to a user or provide a number.' }, { quoted: m });
    try {
      const status = await sock.fetchStatus(target);
      await sock.sendMessage(from, { text: `🕐 Last seen: *${status.setAt ? status.setAt.toLocaleString() : 'Hidden'}*` }, { quoted: m });
    } catch {
      await sock.sendMessage(from, { text: '❌ Could not fetch last seen.' }, { quoted: m });
    }
  },
};
