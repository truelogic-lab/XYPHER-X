import axios from 'axios';

export default {
  aliases: ['gfx2', 'gfx3', 'gfx4', 'gfx5', 'gfx6', 'gfx7', 'gfx8', 'gfx9', 'gfx10', 'gfx11', 'gfx12'],
  execute: async ({ sock, m, from, args, command }) => {
    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: `❌ Provide text. E.g., .${command} PRO` }, { quoted: m });

    await sock.sendMessage(from, { text: `🎮 Generating GFX for *${text}*...` }, { quoted: m });

    try {
      // Using a community API for GFX (Ephoto360 styles)
      const style = command.replace('gfx', '') || '1';
      const apiUrl = `https://api.ryzendesu.vip/api/textpro/gfx${style}?text=${encodeURIComponent(text)}`;
      const { data } = await axios.get(apiUrl);

      if (!data || !data.url) throw new Error('API failed');

      await sock.sendMessage(from, { 
        image: { url: data.url }, 
        caption: `🎮 *GFX Style ${style}*\n📝 *Text:* ${text}` 
      }, { quoted: m });

    } catch (e) {
      await sock.sendMessage(from, { text: `❌ GFX generation failed. Try another style.` }, { quoted: m });
    }
  },
};
