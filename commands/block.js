export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, args }) => {
    const target = args[0]?.replace(/\D/g, '');
    if (!target) return sock.sendMessage(from, { text: '❌ Tag or provide number.' }, { quoted: m });
    await sock.updateBlockStatus(`${target}@s.whatsapp.net`, 'block');
    await sock.sendMessage(from, { text: `✅ Blocked *${target}*` }, { quoted: m });
  },
};
