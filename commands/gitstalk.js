import axios from 'axios';
export default {
  execute: async ({ sock, m, from, args }) => {
    const user = args[0];
    if (!user) return sock.sendMessage(from, { text: '❌ Provide a GitHub username.' }, { quoted: m });
    try {
      const { data } = await axios.get(`https://api.github.com/users/${user}`);
      const text = `🐙 *GITHUB PROFILE*\n\n` +
        `👤 *Name:* ${data.name || data.login}\n` +
        `📝 *Bio:* ${data.bio || 'None'}\n` +
        `📦 *Repos:* ${data.public_repos}\n` +
        `👥 *Followers:* ${data.followers}\n` +
        `🔗 *URL:* ${data.html_url}`;
      await sock.sendMessage(from, { image: { url: data.avatar_url }, caption: text }, { quoted: m });
    } catch { await sock.sendMessage(from, { text: '❌ User not found.' }, { quoted: m }); }
  }
};
