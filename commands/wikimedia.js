import axios from 'axios';
export default {
  execute: async ({ sock, m, from, args }) => {
    const query = args.join(' ');
    if (!query) return sock.sendMessage(from, { text: '❌ Provide a search query.' }, { quoted: m });
    try {
      const { data } = await axios.get(`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=1024&format=json`);
      const pages = data.query.pages;
      const page = pages[Object.keys(pages)[0]];
      await sock.sendMessage(from, { image: { url: page.imageinfo[0].thumburl }, caption: `🖼️ ${page.title}` }, { quoted: m });
    } catch { await sock.sendMessage(from, { text: '❌ Not found.' }, { quoted: m }); }
  }
};
