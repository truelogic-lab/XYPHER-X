import axios from 'axios';
import * as cheerio from 'cheerio';

export default {
  execute: async ({ sock, m, from, args }) => {
    const query = args.join(' ');
    if (!query) return sock.sendMessage(from, { text: '❌ Provide a search query.' }, { quoted: m });

    await sock.sendMessage(from, { text: `🔍 Searching Google for *${query}*...` }, { quoted: m });

    try {
      const res = await axios.get(`https://www.google.com/search?q=${encodeURIComponent(query)}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      const $ = cheerio.load(res.data);

      let results = '';
      $('.tF2Cxc').each((i, el) => {
        if (i < 3) {
          const title = $(el).find('h3').text();
          const link = $(el).find('a').attr('href');
          const snippet = $(el).find('.VwiC3b').text();
          results += `📌 *${title}*\n${snippet}\n🔗 ${link}\n\n`;
        }
      });

      if (!results) throw new Error('No results found');
      await sock.sendMessage(from, { text: `🔍 *GOOGLE RESULTS*\n\n${results}` }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Search failed. Google might be blocking the bot.` }, { quoted: m });
    }
  },
};
