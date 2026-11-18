import { downloadMediaMessage } from '@whiskeysockets/baileys';
export default {
  execute: async ({ sock, m, from }) => {
    try {
      const url = await sock.profilePictureUrl(m.key.remoteJid, 'image');
      const res = await fetch(url);
      const buffer = await res.arrayBuffer();
      await sock.sendMessage(from, { image: Buffer.from(buffer), caption: '🖼️ Your Profile Picture' }, { quoted: m });
    } catch {
      await sock.sendMessage(from, { text: '❌ No profile picture found.' }, { quoted: m });
    }
  },
};
