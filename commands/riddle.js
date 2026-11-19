import axios from 'axios';
export default {
  execute: async ({ sock, m, from }) => {
    try {
      const { data } = await axios.get('https://riddles-api.vercel.app/random');
      await sock.sendMessage(from, { text: `🧩 *RIDDLE*\n\n${data.riddle}\n\n_Reply with the answer!_` }, { quoted: m });
      // Note: A full game would check the answer, this just sends one.
    } catch { await sock.sendMessage(from, { text: '❌ Failed to fetch riddle.' }, { quoted: m }); }
  }
};
