import axios from 'axios';
import yts from 'yt-search';

export default {
  execute: async ({ sock, m, from, args }) => {
    const query = args.join(' ');
    if (!query) return sock.sendMessage(from, { text: '❌ Provide a song name or format: .lyrics Artist - Song' }, { quoted: m });

    await sock.sendMessage(from, { text: `🔍 Searching lyrics for *${query}*...` }, { quoted: m });

    try {
      let artist = '';
      let title = query;

      // If the user provided "Artist - Song"
      if (query.includes(' - ')) {
        const parts = query.split(' - ');
        artist = parts[0];
        title = parts[1];
      } else {
        // If they just provided "Song Name", find the artist using YouTube
        const { videos } = await yts(query);
        if (!videos.length) throw new Error('Song not found');
        
        // Try to extract artist from YouTube title (e.g., "Artist - Song (Official Video)")
        const firstVideo = videos[0].title;
        if (firstVideo.includes(' - ')) {
          const parts = firstVideo.split(' - ');
          artist = parts[0].trim();
          title = parts[1].replace(/\((Official.*?)\)|\[.*?\]|Lyrics|Video/gi, '').trim();
        }
      }

      if (!artist) throw new Error('Could not determine artist');

      const res = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
      
      const lyrics = res.data.lyrics;
      if (!lyrics) throw new Error('No lyrics found');

      const finalText = `🎶 *LYRICS: ${title}* by *${artist}*\n\n${lyrics.substring(0, 3000)}...\n\n> XYPHER-X`;
      
      await sock.sendMessage(from, { text: finalText }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Lyrics not found for *${query}*. Try adding the artist name like this: .lyrics Artist - Song` }, { quoted: m });
    }
  },
};
