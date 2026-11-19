import axios from 'axios';

export default {
  execute: async ({ sock, m, from, args }) => {
    const query = args.join(' ');
    if (!query) return sock.sendMessage(from, { text: '❌ Provide a search term for the GIF.' }, { quoted: m });

    try {
      const apiUrl = `https://api.tenor.com/v1/search?q=${encodeURIComponent(query)}&key=LIVDSRZULELA&limit=1`;
      const { data } = await axios.get(apiUrl);

      if (!data.results || data.results.length === 0) throw new Error('No GIFs found.');

      const gifUrl = data.results[0].media[0].mp4.url;
      
      await sock.sendMessage(from, { 
        video: { url: gifUrl }, 
        gifPlayback: true,
        caption: `🎞️ *${query}*`
      }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Error: ${e.message}` }, { quoted: m });
    }
  },
};
