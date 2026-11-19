import axios from 'axios';

export default {
  aliases: ['fb'],
  execute: async ({ sock, m, from, args }) => {
    const url = args[0];
    if (!url || !url.includes('facebook.com')) return sock.sendMessage(from, { text: '❌ Provide a valid Facebook video link.' }, { quoted: m });

    await sock.sendMessage(from, { text: '⏳ Fetching Facebook video...' }, { quoted: m });

    try {
      const apiUrl = `https://api.ryzendesu.vip/api/downloader/fbdl?url=${encodeURIComponent(url)}`;
      const { data } = await axios.get(apiUrl);

      if (!data || !data.url) throw new Error('Failed to fetch video.');

      await sock.sendMessage(from, {
        video: { url: data.url },
        caption: `📥 *Facebook Video Downloaded*\n> XYPHER-X`
      }, { quoted: m });

    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Error: ${e.message}. Link might be private.` }, { quoted: m });
    }
  },
};
