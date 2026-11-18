import { downloadMediaMessage } from '@whiskeysockets/baileys';
export default {
  execute: async ({ sock, m, from }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted || !quoted.imageMessage) return sock.sendMessage(from, { text: '❌ Reply to an image.' }, { quoted: m });
    const buffer = await downloadMediaMessage({ message: quoted, key: m.key }, 'buffer', {}, {});
    await sock.updateProfilePicture(from, buffer);
    await sock.sendMessage(from, { text: '✅ Group profile picture updated.' }, { quoted: m });
  },
};
