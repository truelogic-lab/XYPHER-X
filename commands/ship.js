export default {
  execute: async ({ sock, m, from }) => {
    const user1 = m.key.participant || m.key.remoteJid;
    const user2 = m.message.extendedTextMessage?.contextInfo?.participant;
    if (!user2) return sock.sendMessage(from, { text: '❌ Tag someone to ship them with you.' }, { quoted: m });
    const percent = Math.floor(Math.random() * 100);
    await sock.sendMessage(from, { text: `❤️ *LOVE SHIP*\n\n@${user1.split('@')[0]} 💞 @${user2.split('@')[0]}\n\nMatch: *${percent}%*`, mentions: [user1, user2] }, { quoted: m });
  }
};
