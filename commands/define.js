import axios from 'axios';
export default {
  execute: async ({ sock, m, from, args }) => {
    const word = args[0];
    if (!word) return sock.sendMessage(from, { text: '❌ Provide a word.' }, { quoted: m });
    try {
      const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const def = data[0].meanings[0].definitions[0].definition;
      await sock.sendMessage(from, { text: `📖 *${word.toUpperCase()}*\n\n${def}` }, { quoted: m });
    } catch { await sock.sendMessage(from, { text: '❌ Not found.' }, { quoted: m }); }
  }
};
