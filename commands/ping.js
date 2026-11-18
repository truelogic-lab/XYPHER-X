export default {
  execute: async ({ sock, m, from, settings }) => {
    const start = Date.now();
    const sent = await sock.sendMessage(from, { text: '🏓 Pinging...' }, { quoted: m });
    const ms = Date.now() - start;
    
    const text = `⚡ *${settings.botName} SPEED*\n\n` +
      `📶 *Latency:* ${ms} ms\n` +
      `🟢 *Status:* Excellent`;
      
    await sock.sendMessage(from, { 
      text, 
      edit: sent.key 
    });
  },
};
