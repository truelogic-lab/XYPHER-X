export default {
  execute: async ({ sock, m, from, args }) => {
    const time = args[0];
    const text = args.slice(1).join(' ');
    if (!time || !text) return sock.sendMessage(from, { text: '❌ Usage: .reminder 10m Drink water' }, { quoted: m });
    
    let ms = 0;
    if (time.endsWith('s')) ms = parseInt(time) * 1000;
    else if (time.endsWith('m')) ms = parseInt(time) * 60000;
    else if (time.endsWith('h')) ms = parseInt(time) * 3600000;
    else return sock.sendMessage(from, { text: '❌ Invalid time. Use 10s, 5m, 1h.' }, { quoted: m });

    await sock.sendMessage(from, { text: `⏱️ I will remind you in ${time}.` }, { quoted: m });
    setTimeout(() => {
      sock.sendMessage(from, { text: `🔔 *REMINDER:* ${text}` });
    }, ms);
  }
};
