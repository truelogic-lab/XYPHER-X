import { evaluate } from 'mathjs';

export default {
  aliases: ['calculator'],
  execute: async ({ sock, m, from, args }) => {
    const expr = args.join(' ');
    if (!expr) return sock.sendMessage(from, { text: '❌ Provide an expression. E.g., .calc 5 * 8 + 2' }, { quoted: m });

    try {
      const result = evaluate(expr);
      await sock.sendMessage(from, { text: `🧮 *Math Result*\n\n📝 *Input:* ${expr}\n✅ *Output:* ${result}` }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Invalid math expression.` }, { quoted: m });
    }
  },
};
