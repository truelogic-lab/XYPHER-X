export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, args }) => {
    const phone = args[0]?.replace(/\D/g, '');
    if (!phone) return sock.sendMessage(from, { text: '❌ Provide a number. E.g., .pair 254xxxxxxxxx' }, { quoted: m });
    try {
      const code = await sock.requestPairingCode(phone);
      await sock.sendMessage(from, { text: `🔑 Pairing code for ${phone}: *${code}*` }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed: ${e.message}` }, { quoted: m });
    }
  },
};
