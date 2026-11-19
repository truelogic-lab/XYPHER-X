import axios from 'axios';

export default {
  execute: async ({ sock, m, from, args }) => {
    const query = args.join(' ');
    if (!query) return sock.sendMessage(from, { text: '❌ Provide a song name.' }, { quoted: m });

    await sock.sendMessage(from, { text: `🔍 Searching Spotify for *${query}*...` }, { quoted: m });

    try {
      const apiUrl = `https://api.ryzendesu.vip/api/downloader/spotify?query=${encodeURIComponent(query)}`;
      const { data } = await axios.get(apiUrl);
      
      if (!data || !data.url) throw new Error('Not found');

      await sock.sendMessage(from, { 
        audio: { url: data.url }, 
        mimetype: 'audio/mp4',
        fileName: `${data.title}.mp3`
      }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Spotify download failed.` }, { quoted: m });
    }
  },
};
