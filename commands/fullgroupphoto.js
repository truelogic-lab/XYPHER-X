export default {
  execute: async ({ sock, m, from }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    try {
      const url = await sock.profilePictureUrl(from, 'image');
      const res = await fetch(url);
      const buffer = await res.arrayBuffer();
      await sock.sendMessage(from, { image: Buffer.from(buffer), caption: '🖼️ Group Profile Picture' }, { quoted: m });
    } catch {
      await sock.sendMessage(from, { text: '❌ Group has no profile picture.' }, { quoted: m });
    }
  },
};
