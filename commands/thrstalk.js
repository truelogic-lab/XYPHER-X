import axios from 'axios';
export default {
  execute: async ({ sock, m, from, args }) => {
    const user = args[0];
    if (!user) return sock.sendMessage(from, { text: '❌ Provide a Threads username.' }, { quoted: m });
    await sock.sendMessage(from, { text: `🧵 *THREADS PROFILE*\n\n👤 Username: @${user}\n🔗 Link: https://threads.net/@${user}` }, { quoted: m });
  }
};
