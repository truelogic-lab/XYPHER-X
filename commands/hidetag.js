export default {
  execute: async ({ sock, m, from, args }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    try {
      const metadata = await sock.groupMetadata(from);
      const participants = metadata.participants.map(p => p.id);
      const text = args.join(' ') || 'Attention Everyone!';
      
      // Send text but tag everyone invisibly
      await sock.sendMessage(from, { text: text, mentions: participants }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed.` }, { quoted: m });
    }
  },
};
