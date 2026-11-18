export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, args }) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.stanzaId;
    if (!quoted) return sock.sendMessage(from, { text: '❌ Reply to a message to edit it.' }, { quoted: m });
    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: '❌ Provide new text.' }, { quoted: m });
    await sock.sendMessage(from, { text, edit: { remoteJid: from, id: quoted, fromMe: m.key.fromMe } });
  },
};
