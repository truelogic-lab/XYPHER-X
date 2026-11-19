import axios from 'axios';

export default {
  execute: async ({ sock, m, from, args }) => {
    const query = args.join(' ');
    if (!query) return sock.sendMessage(from, { text: '❌ Provide a search term.' }, { quoted: m });

    await sock.sendMessage(from, { text: `🔍 Searching Pinterest for *${query}*...` }, { quoted: m });

    try {
      const apiUrl = `https://api.ryzendesu.vip/api/search/pinterest?query=${encodeURIComponent(query)}`;
      const { data } = await axios.get(apiUrl);

      if (!data || !data.result || data.result.length === 0) throw new Error('No images found.');

      // Send up to 5 random images
      const results = data.result.slice(0, 5);
      for (const img of results) {
        await sock.sendMessage(from, { image: { url: img.image }, caption: `📌 ${img.title || query}` }, { quoted: m });
      }
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Error: ${e.message}` }, { quoted: m });
    }
  },
};
