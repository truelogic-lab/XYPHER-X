import axios from 'axios';

export default {
  execute: async ({ sock, m, from, args }) => {
    const query = args.join(' ');
    if (!query) return sock.sendMessage(from, { text: '❌ Provide a song name for the ringtone.' }, { quoted: m });

    await sock.sendMessage(from, { text: `🔍 Searching ringtones for *${query}*...` }, { quoted: m });

    try {
      // Using a free ringtone API (ProKerala)
      const apiUrl = `https://api.ryzendesu.vip/api/downloader/ringtone?query=${encodeURIComponent(query)}`;
      const { data } = await axios.get(apiUrl);

      if (!data || !data.result || data.result.length === 0) throw new Error('No ringtones found.');

      // Send the first 3 ringtones found
      for (const tone of data.result.slice(0, 3)) {
        await sock.sendMessage(from, {
          audio: { url: tone.audio },
          mimetype: 'audio/mp4',
          fileName: `${tone.title}.mp3`
        }, { quoted: m });
      }
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Error: ${e.message}` }, { quoted: m });
    }
  },
};
