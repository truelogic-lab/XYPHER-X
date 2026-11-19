import translate from 'google-translate-api-x';

export default {
  aliases: ['tr'],
  execute: async ({ sock, m, from, args }) => {
    const text = args.slice(1).join(' ');
    const lang = args[0] || 'en';
    if (!text) return sock.sendMessage(from, { text: '❌ Usage: .translate <lang_code> <text>\nExample: .translate es Hello, how are you?' }, { quoted: m });

    try {
      const res = await translate(text, { to: lang });
      await sock.sendMessage(from, { text: `🌐 *TRANSLATION*\n\n📝 *Original:* ${text}\n✅ *Translated (${lang}):* ${res.text}` }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Translation failed. Check language code.` }, { quoted: m });
    }
  },
};
