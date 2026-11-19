import axios from 'axios';
export default { execute: async ({ sock, m, from }) => {
  try { const { data } = await axios.get('https://api.waifu.pics/sfw/wallpaper'); await sock.sendMessage(from, { image: { url: data.url }, caption: '🌸 Anime Wallpaper' }, { quoted: m }); } catch { await sock.sendMessage(from, { text: '❌ Failed.' }, { quoted: m }); }
}};
