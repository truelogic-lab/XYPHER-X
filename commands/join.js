export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, args }) => {
    const link = args[0];
    if (!link || !link.includes('chat.whatsapp.com')) return sock.sendMessage(from, { text: '❌ Provide a valid WhatsApp group link.' }, { quoted: m });
    const code = link.split('https://chat.whatsapp.com/')[1];
    try {
      await sock.groupAcceptInvite(code);
      await sock.sendMessage(from, { text: '✅ Joined group successfully.' }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed to join: ${e.message}` }, { quoted: m });
    }
  },
};
