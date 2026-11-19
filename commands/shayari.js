export default {
  execute: async ({ sock, m, from }) => {
    await sock.sendMessage(from, { text: `💔 *SHAYARI*\n\nMohabbat mein hum sabhi andhe hote hain...` }, { quoted: m });
  }
};
