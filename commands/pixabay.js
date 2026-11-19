import axios from 'axios';
export default {
  execute: async ({ sock, m, from, args }) => {
    const query = args.join(' ');
    if (!query) return sock.sendMessage(from, { text: '❌ Provide a search query.' }, { quoted: m });
    try {
      const { data } = await axios.get(`https://pixabay.com/api/?key=39633017-88155d48163b64a07e88d207e&q=${encodeURIComponent(query)}&image_type=photo&per_page=3`);
      for (const img of data.hits) { await sock.sendMessage(from, { image: { url: img.webformatURL }, caption: `📸 ${img.tags}` }, { quoted: m }); }
    } catch { await sock.sendMessage(from, { text: '❌ Failed.' }, { quoted: m }); }
  }
};
