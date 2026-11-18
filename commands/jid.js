export default {
  execute: async ({ sock, m, from }) => {
    let jid = from;
    const quoted = m.message.extendedTextMessage?.contextInfo?.participant;
    if (quoted) jid = quoted;
    await sock.sendMessage(from, { text: `🆔 *JID:* ${jid}` }, { quoted: m });
  },
};
