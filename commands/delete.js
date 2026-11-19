export default {
  execute: async ({ sock, m, from }) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.stanzaId;
    const participant = m.message?.extendedTextMessage?.contextInfo?.participant || from;
    
    if (!quoted) return sock.sendMessage(from, { text: '❌ Reply to a message to delete it.' }, { quoted: m });

    try {
      await sock.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: quoted, participant } });
    } catch (e) {
      // If it's the bot's own message
      try {
        await sock.sendMessage(from, { delete: { remoteJid: from, fromMe: true, id: quoted } });
      } catch (err) {
        await sock.sendMessage(from, { text: '❌ I cannot delete that message (it might be too old).' }, { quoted: m });
      }
    }
  },
};
