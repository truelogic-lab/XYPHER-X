export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, args }) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const target = args[0]?.replace(/\D/g, '') + '@s.whatsapp.net';
    if (!quoted) return sock.sendMessage(from, { text: '❌ Reply to a message to forward.' }, { quoted: m });
    if (!target || target === 'undefined@s.whatsapp.net') return sock.sendMessage(from, { text: '❌ Provide a number.' }, { quoted: m });
    
    await sock.sendMessage(target, { forward: { message: quoted, key: m.key } });
    await sock.sendMessage(from, { text: '✅ Message forwarded.' }, { quoted: m });
  },
};
