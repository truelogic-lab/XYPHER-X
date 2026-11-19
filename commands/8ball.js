const responses = ["Yes, definitely.", "No, absolutely not.", "Ask again later.", "Without a doubt.", "My sources say no.", "Outlook good."];
export default {
  execute: async ({ sock, m, from, args }) => {
    const question = args.join(' ');
    if (!question) return sock.sendMessage(from, { text: '❌ Ask a question.' }, { quoted: m });
    const answer = responses[Math.floor(Math.random() * responses.length)];
    await sock.sendMessage(from, { text: `🎱 *8BALL*\n\n❓ *Q:* ${question}\n💬 *A:* ${answer}` }, { quoted: m });
  }
};
