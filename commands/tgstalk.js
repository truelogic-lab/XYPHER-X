import axios from 'axios';
export default {
  execute: async ({ sock, m, from, args }) => {
    const user = args[0];
    if (!user) return sock.sendMessage(from, { text: '❌ Provide a Telegram username.' }, { quoted: m });
    await sock.sendMessage(from, { text: `✈️ *TELEGRAM PROFILE*\n\n👤 Username: @${user.replace('@','')}\n🔗 Link: https://t.me/${user.replace('@','')}` }, { quoted: m });
  }
};
