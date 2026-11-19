import axios from 'axios';

export default {
  execute: async ({ sock, m, from }) => {
    await sock.sendMessage(from, { text: '📰 Fetching anime news...' }, { quoted: m });
    try {
      const { data } = await axios.get('https://api.jikan.moe/v4/seasons/now');
      const anime = data.data[Math.floor(Math.random() * data.data.length)];
      
      const text = `📰 *ANIME NEWS*\n\n` +
        `🎬 *Title:* ${anime.title}\n` +
        `⭐ *Score:* ${anime.score || 'N/A'}\n` +
        `📺 *Episodes:* ${anime.episodes || 'Ongoing'}\n` +
        `📝 *Synopsis:* ${anime.synopsis?.substring(0, 300)}...`;
        
      await sock.sendMessage(from, { image: { url: anime.images.jpg.image_url }, caption: text }, { quoted: m });
    } catch {
      await sock.sendMessage(from, { text: '❌ Failed to fetch anime news.' }, { quoted: m });
    }
  },
};
