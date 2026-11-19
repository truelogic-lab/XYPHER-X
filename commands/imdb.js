import axios from 'axios';

export default {
  execute: async ({ sock, m, from, args }) => {
    const query = args.join(' ');
    if (!query) return sock.sendMessage(from, { text: '❌ Provide a movie name.' }, { quoted: m });

    try {
      const res = await axios.get(`https://api.ryzendesu.vip/api/search/imdb?query=${encodeURIComponent(query)}`);
      const data = res.data.result[0];
      if (!data) throw new Error('Not found');

      const text = `🎬 *IMDB SEARCH*\n\n` +
        `📌 *Title:* ${data.title}\n` +
        `📅 *Year:* ${data.year}\n` +
        `⭐ *Rating:* ${data.rating}\n` +
        `🎭 *Genre:* ${data.genre}\n` +
        `📝 *Plot:* ${data.plot}\n\n` +
        `> XYPHER-X`;

      await sock.sendMessage(from, { image: { url: data.poster }, caption: text }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Movie not found.` }, { quoted: m });
    }
  },
};
