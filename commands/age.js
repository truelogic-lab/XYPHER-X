export default {
  execute: async ({ sock, m, from, args }) => {
    const year = parseInt(args[0]);
    if (!year || year < 1900 || year > new Date().getFullYear()) return sock.sendMessage(from, { text: '❌ Provide a valid birth year.' }, { quoted: m });
    const age = new Date().getFullYear() - year;
    await sock.sendMessage(from, { text: `🎂 You are *${age}* years old.` }, { quoted: m });
  }
};
