export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, args }) => {
    const timeArg = args[0];
    const text = args.slice(1).join(' ');
    if (!timeArg || !text) return sock.sendMessage(from, { text: '❌ Usage: .schedulestatus 5m Hello World' }, { quoted: m });
    
    let ms = 0;
    if (timeArg.endsWith('s')) ms = parseInt(timeArg) * 1000;
    else if (timeArg.endsWith('m')) ms = parseInt(timeArg) * 60000;
    else if (timeArg.endsWith('h')) ms = parseInt(timeArg) * 3600000;
    else return sock.sendMessage(from, { text: '❌ Invalid time format. Use 10s, 5m, 1h.' }, { quoted: m });

    await sock.sendMessage(from, { text: `⏱️ Status scheduled in ${timeArg}.` }, { quoted: m });
    setTimeout(async () => {
      try {
        await sock.sendMessage('status@broadcast', { text });
        await sock.sendMessage(from, { text: `✅ Status posted to your story!` });
      } catch (e) { console.error(e); }
    }, ms);
  },
};
