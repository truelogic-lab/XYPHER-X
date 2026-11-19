import axios from 'axios';

export default {
  aliases: ['urlshortener'],
  execute: async ({ sock, m, from, args }) => {
    const url = args[0];
    if (!url || !url.startsWith('http')) return sock.sendMessage(from, { text: '❌ Provide a valid URL.' }, { quoted: m });

    try {
      // Using TinyURL API (Free, no key)
      const res = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      await sock.sendMessage(from, { text: `🔗 *SHORT URL*\n\n📌 *Original:* ${url}\n✅ *Short:* ${res.data}` }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed to shorten URL.` }, { quoted: m });
    }
  },
};
