import axios from 'axios';
export default {
  execute: async ({ sock, m, from, args }) => {
    const url = args[0];
    if (!url) return sock.sendMessage(from, { text: '❌ Provide an X/Twitter link.' }, { quoted: m });
    await sock.sendMessage(from, { text: '⏳ Fetching...' }, { quoted: m });
    try {
      const { data } = await axios.get(`https://api.ryzendesu.vip/api/downloader/twitter?url=${encodeURIComponent(url)}`);
      await sock.sendMessage(from, { video: { url: data.url }, caption: '🐦 Downloaded' }, { quoted: m });
    } catch { await sock.sendMessage(from, { text: '❌ Failed.' }, { quoted: m }); }
  }
};
