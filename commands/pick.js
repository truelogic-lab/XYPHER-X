export default {
  execute: async ({ sock, m, from, args }) => {
    const options = args.join(' ').split(',');
    if (options.length < 2) return sock.sendMessage(from, { text: '❌ Provide options separated by commas. Example: .pick pizza, burger, salad' }, { quoted: m });
    const pick = options[Math.floor(Math.random() * options.length)].trim();
    await sock.sendMessage(from, { text: `🎯 I pick: *${pick}*` }, { quoted: m });
  }
};
