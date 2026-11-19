import axios from 'axios';

export default {
  execute: async ({ sock, m, from, args }) => {
    const appName = args.join(' ');
    if (!appName) return sock.sendMessage(from, { text: '❌ Provide an app name. (e.g., .apk WhatsApp)' }, { quoted: m });

    await sock.sendMessage(from, { text: `🔍 Searching for APK: *${appName}*...` }, { quoted: m });

    try {
      // Using Aptoide search API
      const apiUrl = `https://ws75.aptoide.com/api/7/apps/search?query=${encodeURIComponent(appName)}&limit=1`;
      const { data } = await axios.get(apiUrl);

      if (!data || !data.datalist || !data.datalist.list || data.datalist.list.length === 0) {
        throw new Error('App not found.');
      }

      const app = data.datalist.list[0];
      const text = `📱 *APK FOUND*\n\n` +
        `📝 *Name:* ${app.name}\n` +
        `🏢 *Developer:* ${app.store.name}\n` +
        `📦 *Size:* ${(app.size / 1024 / 1024).toFixed(2)} MB\n` +
        `⬇️ *Download:* ${app.file.path}\n\n` +
        `> Note: You may need to enable "Install from Unknown Sources" on your phone.`;

      await sock.sendMessage(from, { text }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Error: ${e.message}` }, { quoted: m });
    }
  },
};
