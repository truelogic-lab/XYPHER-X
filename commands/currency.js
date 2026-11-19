import axios from 'axios';
export default {
  execute: async ({ sock, m, from, args }) => {
    const amount = parseFloat(args[0]); const fromCur = args[1]?.toUpperCase(); const toCur = args[2]?.toUpperCase();
    if (!amount || !fromCur || !toCur) return sock.sendMessage(from, { text: '❌ Usage: .currency 100 USD KES' }, { quoted: m });
    try {
      const { data } = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCur}`);
      const rate = data.rates[toCur];
      if (!rate) throw new Error();
      await sock.sendMessage(from, { text: `💵 *CURRENCY*\n\n${amount} ${fromCur} = *${(amount * rate).toFixed(2)} ${toCur}*` }, { quoted: m });
    } catch { await sock.sendMessage(from, { text: '❌ Invalid currency.' }, { quoted: m }); }
  }
};
