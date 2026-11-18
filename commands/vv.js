import { downloadMediaMessage } from '@whiskeysockets/baileys';

export default {
  aliases: ['viewonce'],
  execute: async ({ sock, m, from }) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted) return sock.sendMessage(from, { text: '❌ Reply to a View Once media.' }, { quoted: m });

    const type = Object.keys(quoted)[0];
    if (type !== 'viewOnceMessageV2' && type !== 'viewOnceMessage') {
      return sock.sendMessage(from, { text: '❌ That is not a View Once message.' }, { quoted: m });
    }

    const innerMsg = quoted[type].message;
    const mediaType = Object.keys(innerMsg)[0];
    
    const buffer = await downloadMediaMessage(
      { message: innerMsg, key: m.key },
      'buffer', {}, {}
    );

    if (mediaType === 'imageMessage') {
      await sock.sendMessage(from, { image: buffer, caption: '👁️ Bypassed!' }, { quoted: m });
    } else if (mediaType === 'videoMessage') {
      await sock.sendMessage(from, { video: buffer, caption: '👁️ Bypassed!' }, { quoted: m });
    }
  },
};
