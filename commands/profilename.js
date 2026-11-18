export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, args }) => {
    const name = args.join(' ');
    if (!name) return sock.sendMessage(from, { text: '❌ Provide a name.' }, { quoted: m });
    await sock.updateProfileName(name);
    await sock.sendMessage(from, { text: `✅ Bot name updated to: ${name}` }, { quoted: m });
  },
};
