import axios from 'axios';
export default {
  execute: async ({ sock, m, from }) => {
    try {
      const { data } = await axios.get('https://complimentr.com/api');
      await sock.sendMessage(from, { text: `🥰 *COMPLIMENT*\n\n${data.compliment}` }, { quoted: m });
    } catch { await sock.sendMessage(from, { text: '❌ Failed.' }, { quoted: m }); }
  }
};
