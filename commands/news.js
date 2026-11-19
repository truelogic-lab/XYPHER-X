import axios from 'axios';
export default {
  execute: async ({ sock, m, from }) => {
    try {
      const { data } = await axios.get('https://saurav.tech/NewsAPI/top-headlines/category/general/us.json');
      let text = `📰 *TOP NEWS*\n\n`;
      data.articles.slice(0, 3).forEach((a, i) => { text += `${i+1}. *${a.title}*\n${a.url}\n\n`; });
      await sock.sendMessage(from, { text }, { quoted: m });
    } catch { await sock.sendMessage(from, { text: '❌ Failed.' }, { quoted: m }); }
  }
};
