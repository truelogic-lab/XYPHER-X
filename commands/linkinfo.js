export default {
  execute: async ({ sock, m, from, args }) => {
    const link = args[0];
    if (!link || !link.includes('chat.whatsapp.com')) return sock.sendMessage(from, { text: '❌ Provide a valid WhatsApp group link.' }, { quoted: m });
    
    try {
      const code = link.split('https://chat.whatsapp.com/')[1];
      const info = await sock.groupGetInviteInfo(code);
      
      const text = `🔍 *GROUP LINK INFO*\n\n` +
        `📝 *Name:* ${info.subject}\n` +
        `👥 *Members:* ${info.size}\n` +
        `📅 *Created:* ${new Date(info.creation * 1000).toLocaleDateString()}\n` +
        `👑 *Creator:* @${info.owner?.split('@')[0] || 'Unknown'}\n` +
        `📄 *Description:*\n${info.desc || 'None'}`;
        
      await sock.sendMessage(from, { text, mentions: [info.owner] }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: '❌ Failed to fetch link info. The link might be invalid or revoked.' }, { quoted: m });
    }
  },
};
