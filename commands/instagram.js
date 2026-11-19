import axios from 'axios';

export default {
  aliases: ['ig'],
  execute: async ({ sock, m, from, args }) => {
    const url = args[0];
    if (!url || !url.includes('instagram.com')) return sock.sendMessage(from, { text: '❌ Provide a valid Instagram link.' }, { quoted: m });

    await sock.sendMessage(from, { text: '⏳ Fetching Instagram media...' }, { quoted: m });

    try {
      const apiUrl = `https://api.tiklydown.eu.org/api/download/insta?url=${encodeURIComponent(url)}`;
      const { data } = await axios.get(apiUrl);

      if (!data || !data.medias || data.medias.length === 0) throw new Error('No media found.');

      for (const media of data.medias) {
        if (media.type === 'video') {
          await sock.sendMessage(from, { video: { url: media.url }, caption: '📥 Downloaded via XYPHER-X' }, { quoted: m });
        } else {
          await sock.sendMessage(from, { image: { url: media.url }, caption: '📥 Downloaded via XYPHER-X' }, { quoted: m });
        }
      }
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Error: ${e.message}. Link might be private or invalid.` }, { quoted: m });
    }
  },
};
