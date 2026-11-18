export default {
  execute: async ({ sock, m, from }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    await sock.sendMessage(from, { text: '🔍 *Scanning for online users...*\n\n⚠️ WhatsApp privacy settings prevent bots from seeing exactly who is online. However, the bot is actively monitoring this chat.' }, { quoted: m });
  },
};
