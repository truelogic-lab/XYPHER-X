import axios from 'axios';

export default {
  aliases: ['india', 'china', 'japan', 'korea', 'thai', 'malaysia'],
  execute: async ({ sock, m, from, command }) => {
    await sock.sendMessage(from, { text: `🖼️ Fetching ${command} image...` }, { quoted: m });
    try {
      const url = `https://api.ryzendesu.vip/api/random/${command}`;
      const res = await axios.get(url, { responseType: 'arraybuffer' });
      await sock.sendMessage(from, { image: Buffer.from(res.data), caption: `📍 ${command.toUpperCase()}` }, { quoted: m });
    } catch {
      await sock.sendMessage(from, { text: `❌ Failed to fetch image for ${command}.` }, { quoted: m });
    }
  },
};
