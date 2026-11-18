export default {
  execute: async ({ sock, m, from, args }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    const target = m.message.extendedTextMessage?.contextInfo?.participant;
    if (!target) return sock.sendMessage(from, { text: '❌ Reply to the user you want to tag.' }, { quoted: m });
    
    const text = args.join(' ') || 'Hey!';
    await sock.sendMessage(from, { text: `@${target.split('@')[0]} ${text}`, mentions: [target] }, { quoted: m });
  },
};
