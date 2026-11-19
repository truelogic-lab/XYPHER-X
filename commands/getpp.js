export default {
  execute: async ({ sock, m, from, args }) => {
    const target = m.message?.extendedTextMessage?.contextInfo?.participant || (args[0] ? args[0].replace(/\D/g, '') + '@s.whatsapp.net' : from);
    try {
      const url = await sock.profilePictureUrl(target, 'image');
      const res = await fetch(url);
      const buffer = await res.arrayBuffer();
      await sock.sendMessage(from, { image: Buffer.from(buffer), caption: '📸 Profile Picture' }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: '❌ Could not fetch profile picture (or it is hidden).' }, { quoted: m });
    }
  },
};
