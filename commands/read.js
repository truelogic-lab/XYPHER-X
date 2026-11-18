export default {
  ownerOnly: true,
  execute: async ({ sock, m, from }) => {
    const key = m.message?.extendedTextMessage?.contextInfo?.stanzaId;
    if (!key) return sock.sendMessage(from, { text: '❌ Reply to a message to read it.' }, { quoted: m });
    await sock.readMessages([{ remoteJid: from, id: key, participant: m.key.participant }]);
    await sock.sendMessage(from, { text: '✅ Message read.' }, { quoted: m });
  },
};
