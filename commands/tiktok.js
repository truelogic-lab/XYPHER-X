import axios from 'axios';

export default {
  aliases: ['tt'],
  execute: async ({ sock, m, from, args }) => {
    const url = args[0];
    if (!url || !url.includes('tiktok.com')) return sock.sendMessage(from, { text: '❌ Provide a valid TikTok link.' }, { quoted: m });

    await sock.sendMessage(from, { text: '⏳ Fetching TikTok video...' }, { quoted: m });

    try {
      // Using a public TikTok API scraper
      const apiUrl = `https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`;
      const { data } = await axios.get(apiUrl);

      if (!data || !data.video) throw new Error('Failed to fetch video.');

      await sock.sendMessage(from, {
        video: { url: data.video.noWatermark },
        caption: `🎵 *${data.title || 'TikTok Video'}*`
      }, { quoted: m });

    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Error: ${e.message}. Link might be private or invalid.` }, { quoted: m });
    }
  },
};
