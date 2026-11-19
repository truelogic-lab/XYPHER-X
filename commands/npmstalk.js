import axios from 'axios';
export default {
  execute: async ({ sock, m, from, args }) => {
    const user = args[0];
    if (!user) return sock.sendMessage(from, { text: '❌ Provide an NPM username.' }, { quoted: m });
    try {
      const { data } = await axios.get(`https://registry.npmjs.org/-/v1/search?text=maintainer:${user}&size=1`);
      const pkg = data.objects[0]?.package;
      if (!pkg) throw new Error('Not found');
      await sock.sendMessage(from, { text: `📦 *NPM USER*\n\n👤 *Name:* ${pkg.author?.name || user}\n🔗 *Profile:* https://www.npmjs.com/~${user}` }, { quoted: m });
    } catch { await sock.sendMessage(from, { text: '❌ User not found.' }, { quoted: m }); }
  }
};
