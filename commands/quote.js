import axios from 'axios';
export default {
  execute: async ({ sock, m, from }) => {
    try {
      const { data } = await axios.get('https://zenquotes.io/api/random');
      const quote = data[0];
      await sock.sendMessage(from, { text: `💬 *QUOTE*\n\n"${quote.q}"\n\n— *${quote.a}*` }, { quoted: m });
    } catch { await sock.sendMessage(from, { text: '❌ Failed to fetch quote.' }, { quoted: m }); }
  }
};
