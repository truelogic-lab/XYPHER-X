export default {
  aliases: ['math'],
  execute: async ({ sock, m, from, args }) => {
    const expr = args.join(' ');
    if (!expr) return sock.sendMessage(from, { text: '❌ Provide an expression. E.g. `.calc 2+2*5`' }, { quoted: m });

    try {
      // Safe eval for basic math
      const result = Function(`"use strict"; return (${expr})`)();
      await sock.sendMessage(from, { text: `🧮 *Result:* ${result}` }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: '❌ Invalid expression.' }, { quoted: m });
    }
  },
};
