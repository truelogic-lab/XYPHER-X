import axios from 'axios';

export default {
  execute: async ({ sock, m, from, args }) => {
    const repoUrl = args[0];
    if (!repoUrl || !repoUrl.includes('github.com')) return sock.sendMessage(from, { text: '❌ Provide a valid GitHub repo link.' }, { quoted: m });

    try {
      const parts = repoUrl.replace('https://github.com/', '').split('/');
      const user = parts[0];
      const repo = parts[1];

      const apiUrl = `https://api.github.com/repos/${user}/${repo}/zipball`;
      
      const text = `📦 *GITHUB REPOSITORY*\n\n` +
        `👤 *Owner:* ${user}\n` +
        `📂 *Repo:* ${repo}\n\n` +
        `⬇️ *Download ZIP:* ${apiUrl}\n\n` +
        `> Copy the link above and paste it into your browser to download.`;

      await sock.sendMessage(from, { text }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Error: ${e.message}` }, { quoted: m });
    }
  },
};
