import axios from 'axios';

export default {
  aliases: ['animewall', 'pokepic', 'pokemon'],
  execute: async ({ sock, m, from, command }) => {
    await sock.sendMessage(from, { text: `🌸 Fetching ${command}...` }, { quoted: m });
    try {
      let url;
      if (command === 'pokemon' || command === 'pokepic') {
        url = `https://api.popcat.xyz/pokemon?name=${Math.floor(Math.random() * 150) + 1}`;
        const { data } = await axios.get(url);
        return sock.sendMessage(from, { image: { url: data.image }, caption: `🔴 *${data.name}*` }, { quoted: m });
      }

      // For anime images
      const endpoints = ['waifu', 'neko', 'shinobu', 'megumin'];
      const randomEndpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
      const { data } = await axios.get(`https://api.waifu.pics/sfw/${randomEndpoint}`);
      
      await sock.sendMessage(from, { image: { url: data.url }, caption: `🌸 Anime Pic` }, { quoted: m });
    } catch {
      await sock.sendMessage(from, { text: `❌ Failed to fetch anime image.` }, { quoted: m });
    }
  },
};
