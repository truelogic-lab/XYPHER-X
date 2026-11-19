export default {
  execute: async ({ sock, m, from, args }) => {
    const time = args[0];
    const text = args.slice(1).join(' ');
    if (!time || !text) return sock.sendMessage(from, { text: '❌ Usage: .schedule 10m Hello' }, { quoted: m });
    
    let ms = 0;
    if (time.endsWith('s')) ms = parseInt(time) * 1000;
    else if (time.endsWith('m')) ms = parseInt(time) * 60000;
    else if (time.endsWith('h')) ms = parseInt(time) * 3600000;
    else return sock.sendMessage(from, { text: '❌ Invalid time.' }, { quoted: m });

    await sock.sendMessage(from, { text: `⏱️ Message scheduled for ${time}.` }, { quoted: m });
    setTimeout(() => { sock.sendMessage(from, { text }); }, ms);
  }
};
