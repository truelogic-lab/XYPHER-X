export default {
  execute: async ({ sock, m, from }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    
    const metadata = await sock.groupMetadata(from);
    const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
    const members = metadata.participants.filter(p => p.id !== botId).map(p => p.id);
    
    if (members.length < 2) return sock.sendMessage(from, { text: '❌ Need at least 2 members to find a couple.' }, { quoted: m });
    
    const shuffled = members.sort(() => 0.5 - Math.random());
    const p1 = shuffled[0];
    const p2 = shuffled[1];
    
    const text = `❤️ *MATCHMAKER* ❤️\n\n` +
      `@${p1.split('@')[0]} 💞 @${p2.split('@')[0]}\n\n` +
      `Congratulations! You two are a perfect match! 🎉`;
      
    await sock.sendMessage(from, { text, mentions: [p1, p2] }, { quoted: m });
  },
};
