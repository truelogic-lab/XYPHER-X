import axios from 'axios';
export default {
  execute: async ({ sock, m, from }) => {
    try {
      const { data } = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random');
      await sock.sendMessage(from, { text: `🧠 *FACT*\n\n${data.text}` }, { quoted: m });
    } catch { await sock.sendMessage(from, { text: '❌ Failed to fetch fact.' }, { quoted: m }); }
  }
};
