import yts from 'yt-search';
import axios from 'axios';

export default {
  aliases: ['play'],
  execute: async ({ sock, m, from, args }) => {
    const query = args.join(' ');
    if (!query) return sock.sendMessage(from, { text: '❌ Provide a song name.' }, { quoted: m });

    await sock.sendMessage(from, { text: `🔍 Searching for *${query}*...` }, { quoted: m });
    const { videos } = await yts(query);
    if (!videos.length) return sock.sendMessage(from, { text: '❌ No results found.' }, { quoted: m });

    const video = videos[0];
    await sock.sendMessage(from, { text: `🎵 Downloading *${video.title}*...` }, { quoted: m });

    // Using a public API to get MP3 (Replace with your own API if needed)
    const apiUrl = `https://api.vevioz.com/api/button/mp3/${video.videoId}`;
    
    try {
      const res = await axios.get(apiUrl, { responseType: 'arraybuffer' });
      await sock.sendMessage(from, {
        audio: Buffer.from(res.data),
        mimetype: 'audio/mp4'
      }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: '❌ Download failed. API might be down.' }, { quoted: m });
    }
  },
};
