import axios from 'axios';

export default {
  aliases: ['fancy', 'metallic', 'neon', 'fire', 'glitch', 'snow', 'ice', 'matrix', 'hacker', 'purple', 'sand', 'leaves'],
  execute: async ({ sock, m, from, args, command }) => {
    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: `❌ Provide text for the logo. E.g., .${command} XYPHER` }, { quoted: m });

    await sock.sendMessage(from, { text: `🎨 Generating *${command}* logo for: *${text}*...` }, { quoted: m });

    try {
      // Using a free text effect API
      const apiUrl = `https://api.ryzendesu.vip/api/textpro/${command}?text=${encodeURIComponent(text)}`;
      const { data } = await axios.get(apiUrl);

      if (!data || !data.url) throw new Error('API failed');

      await sock.sendMessage(from, { 
        image: { url: data.url }, 
        caption: `✨ *Style:* ${command.toUpperCase()}\n📝 *Text:* ${text}\n> XYPHER-X` 
      }, { quoted: m });

    } catch (e) {
      // Fallback: Generate a simple text-based image using a reliable API
      try {
        const fallbackUrl = `https://api.popcat.xyz/opinion?text=${encodeURIComponent(text)}`;
        await sock.sendMessage(from, { text: `⚠️ The *${command}* style is currently down on the API. Try a different style like .neon or .glitch.` }, { quoted: m });
      } catch (err) {
        await sock.sendMessage(from, { text: `❌ Failed to generate logo.` }, { quoted: m });
      }
    }
  },
};
