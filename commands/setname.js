export default {
  execute: async ({ sock, m, from, args }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    const name = args.join(' ');
    if (!name) return sock.sendMessage(from, { text: '❌ Provide a new name.' }, { quoted: m });
    try {
      await sock.groupUpdateSubject(from, name);
      await sock.sendMessage(from, { text: `✅ Group name changed to *${name}*` }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed. Make sure the bot is admin.` }, { quoted: m });
    }
  },
};
