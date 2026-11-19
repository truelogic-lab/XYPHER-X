import yts from 'yt-search';
export default {
  execute: async ({ sock, m, from, args }) => {
    const query = args.join(' ');
    if (!query) return sock.sendMessage(from, { text: '❌ Provide a search query.' }, { quoted: m });
    const { videos } = await yts(query);
    let text = `🔍 *YT SEARCH: ${query}*\n\n`;
    videos.slice(0, 5).forEach((v, i) => { text += `${i+1}. *${v.title}*\n${v.url}\n\n`; });
    await sock.sendMessage(from, { text }, { quoted: m });
  }
};
