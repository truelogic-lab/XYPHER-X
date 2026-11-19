import crypto from 'crypto';

export default {
  execute: async ({ sock, m, from, args }) => {
    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: '❌ Provide text to hash.' }, { quoted: m });

    const md5 = crypto.createHash('md5').update(text).digest('hex');
    const sha256 = crypto.createHash('sha256').update(text).digest('hex');

    const res = `🔐 *HASH GENERATOR*\n\n📝 *Text:* ${text}\n\n#️⃣ *MD5:*\n${md5}\n\n#️⃣ *SHA256:*\n${sha256}`;
    await sock.sendMessage(from, { text: res }, { quoted: m });
  },
};
