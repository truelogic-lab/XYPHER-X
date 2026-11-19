export default {
  execute: async ({ sock, m, from, args }) => {
    const text = args.join('').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!text) return sock.sendMessage(from, { text: '❌ Provide a word.' }, { quoted: m });
    const rev = text.split('').reverse().join('');
    await sock.sendMessage(from, { text: text === rev ? `✅ *Yes!* "${args.join(' ')}" is a palindrome.` : `❌ *No.* "${args.join(' ')}" is not a palindrome.` }, { quoted: m });
  }
};
