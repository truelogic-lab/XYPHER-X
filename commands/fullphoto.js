export default {
  execute: async ({ sock, m, from, args }) => {
    const target = m.message?.extendedTextMessage?.contextInfo?.participant || args[0]?.replace(/\D/g, '') + '@s.whatsapp.net' || from;
    try {
      const url = await sock.profilePictureUrl(target, 'image');
      if (!url) throw new Error('No PP');
      const res = await fetch(url);
      const buffer = await res.arrayBuffer();
      await sock.sendMessage(from, { image: Buffer.from(buffer), caption: '📸 Full Profile Picture' }, { quoted: m });
    } catch {
      await sock.sendMessage(from, { text: '❌ Could not fetch profile picture (or it is hidden).' }, { quoted: m });
    }
  },
};
