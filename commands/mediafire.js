import axios from 'axios';

export default {
  execute: async ({ sock, m, from, args }) => {
    const url = args[0];
    if (!url || !url.includes('mediafire.com')) return sock.sendMessage(from, { text: '❌ Provide a valid Mediafire link.' }, { quoted: m });

    await sock.sendMessage(from, { text: '⏳ Bypassing Mediafire link...' }, { quoted: m });

    try {
      const apiUrl = `https://api.ryzendesu.vip/api/downloader/mediafire?url=${encodeURIComponent(url)}`;
      const { data } = await axios.get(apiUrl);

      if (!data || !data.url) throw new Error('Failed to fetch file.');

      const text = `📁 *MEDIAFIRE FILE*\n\n` +
        `📝 *Name:* ${data.filename}\n` +
        `📦 *Size:* ${data.filesize}\n` +
        `📂 *Type:* ${data.filetype}\n` +
        `⬇️ *Download Link:* ${data.url}`;

      await sock.sendMessage(from, { text }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Error: ${e.message}` }, { quoted: m });
    }
  },
};
