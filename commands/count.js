export default {
  execute: async ({ sock, m, from, args }) => {
    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: '❌ Provide some text to count.' }, { quoted: m });
    
    const chars = text.length;
    const words = text.trim().split(/\s+/).length;
    
    await sock.sendMessage(from, { text: `📊 *TEXT COUNTER*\n\n📝 *Characters:* ${chars}\n🔤 *Words:* ${words}` }, { quoted: m });
  },
};
