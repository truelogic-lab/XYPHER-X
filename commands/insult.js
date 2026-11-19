import axios from 'axios';
export default {
  execute: async ({ sock, m, from }) => {
    try {
      const { data } = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
      await sock.sendMessage(from, { text: `🤬 *INSULT*\n\n${data.insult}` }, { quoted: m });
    } catch { await sock.sendMessage(from, { text: '❌ Failed.' }, { quoted: m }); }
  }
};
