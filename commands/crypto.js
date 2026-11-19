import axios from 'axios';
export default {
  execute: async ({ sock, m, from, args }) => {
    const coin = args[0]?.toLowerCase() || 'bitcoin';
    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`);
      if (!data[coin]) throw new Error();
      await sock.sendMessage(from, { text: `🪙 *CRYPTO*\n\n${coin.toUpperCase()}: *$${data[coin].usd}*` }, { quoted: m });
    } catch { await sock.sendMessage(from, { text: '❌ Coin not found.' }, { quoted: m }); }
  }
};
