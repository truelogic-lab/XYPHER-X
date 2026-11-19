export default {
  execute: async ({ sock, m, from, args }) => {
    const name = args.join(' ');
    const quoted = m.message?.extendedTextMessage?.contextInfo?.participant;
    if (!quoted || !name) return sock.sendMessage(from, { text: '❌ Reply to a message with a name. Usage: .savecontact John' }, { quoted: m });
    const vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + `FN:${name}\n` + `TEL;type=CELL;type=VOICE;waid=${quoted.split('@')[0]}:+${quoted.split('@')[0]}\n` + 'END:VCARD';
    await sock.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] } }, { quoted: m });
  }
};
