import axios from 'axios';
export default {
  execute: async ({ sock, m, from, args }) => {
    const user = args[0];
    if (!user) return sock.sendMessage(from, { text: '❌ Provide a Twitter/X username.' }, { quoted: m });
    await sock.sendMessage(from, { text: `🐦 *X (Twitter) PROFILE*\n\n👤 *Username:* @${user}\n🔗 *Profile:* https://x.com/${user}` }, { quoted: m });
  }
};
