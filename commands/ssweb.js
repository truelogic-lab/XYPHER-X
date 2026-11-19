import axios from 'axios';

export default {
  aliases: ['ss'],
  execute: async ({ sock, m, from, args }) => {
    const url = args[0];
    if (!url || !url.startsWith('http')) return sock.sendMessage(from, { text: '❌ Provide a valid URL starting with http:// or https://' }, { quoted: m });

    await sock.sendMessage(from, { text: '📸 Capturing screenshot...' }, { quoted: m });

    try {
      // Using a free screenshot API
      const apiUrl = `https://api.apiflash.com/v1/urltoimage?access_key=8c4b0a1219944c7cb2b8f1e8d6e3b4f1&url=${encodeURIComponent(url)}&width=1280&height=720`;
      const res = await axios.get(apiUrl, { responseType: 'arraybuffer' });
      
      await sock.sendMessage(from, { 
        image: Buffer.from(res.data), 
        caption: `📸 *Screenshot:* ${url}` 
      }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed to capture screenshot. API might be down.` }, { quoted: m });
    }
  },
};
