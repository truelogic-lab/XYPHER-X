import axios from 'axios';
export default {
  execute: async ({ sock, m, from, args }) => {
    await sock.sendMessage(from, { text: '⚠️ Telegram sticker converter is currently under maintenance.' }, { quoted: m });
  }
};
