import { downloadMediaMessage } from '@whiskeysockets/baileys';
export default {
  ownerOnly: true,
  execute: async ({ sock, m, from }) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted || !quoted.imageMessage) return sock.sendMessage(from, { text: '❌ Reply to an image.' }, { quoted: m });
    const buffer = await downloadMediaMessage({ message: quoted, key: m.key }, 'buffer', {}, {});
    await sock.updateProfilePicture(sock.user.id, buffer);
    await sock.sendMessage(from, { text: '✅ Profile picture updated.' }, { quoted: m });
  },
};
