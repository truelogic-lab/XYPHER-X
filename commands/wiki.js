import axios from 'axios';

export default {
  execute: async ({ sock, m, from, args }) => {
    const query = args.join(' ');
    if (!query) return sock.sendMessage(from, { text: '❌ Provide a topic to search on Wikipedia.' }, { quoted: m });

    try {
      const res = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
      const data = res.data;

      if (!data.extract) throw new Error('Not found');
      
      let text = `📖 *WIKIPEDIA: ${data.title}*\n\n${data.extract}`;
      if (data.thumbnail) {
        await sock.sendMessage(from, { image: { url: data.thumbnail.source }, caption: text }, { quoted: m });
      } else {
        await sock.sendMessage(from, { text }, { quoted: m });
      }
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ No Wikipedia article found for *${query}*.` }, { quoted: m });
    }
  },
};
