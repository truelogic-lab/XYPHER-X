import axios from 'axios';
export default {
  execute: async ({ sock, m, from }) => {
    try {
      const { data } = await axios.get('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
      const text = data.type === 'single' ? data.joke : `${data.setup}\n\n*${data.delivery}*`;
      await sock.sendMessage(from, { text: `😂 *JOKE*\n\n${text}` }, { quoted: m });
    } catch { await sock.sendMessage(from, { text: '❌ Failed to fetch joke.' }, { quoted: m }); }
  }
};
