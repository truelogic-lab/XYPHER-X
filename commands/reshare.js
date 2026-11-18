export default {
  ownerOnly: true,
  execute: async ({ sock, m, from }) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted) return sock.sendMessage(from, { text: '❌ Reply to a message to reshare.' }, { quoted: m });
    await sock.sendMessage('status@broadcast', { forward: { message: quoted, key: m.key } });
    await sock.sendMessage(from, { text: '✅ Message reshared to your status.' }, { quoted: m });
  },
};
