import axios from 'axios';
export default {
  execute: async ({ sock, m, from, args }) => {
    const uid = args[0];
    if (!uid) return sock.sendMessage(from, { text: '❌ Provide a Genshin UID.' }, { quoted: m });
    try {
      const { data } = await axios.get(`https://enka.network/api/uid/${uid}`);
      await sock.sendMessage(from, { text: `🎮 *GENSHIN*\n\n👤 Name: ${data.playerInfo.nickname}\n🌍 Server: ${data.playerInfo.server}\n⭐ Level: ${data.playerInfo.level}` }, { quoted: m });
    } catch { await sock.sendMessage(from, { text: '❌ Player not found.' }, { quoted: m }); }
  }
};
