export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, args }) => {
    const link = args[0];
    if (!link) return sock.sendMessage(from, { text: '❌ Provide a channel link.' }, { quoted: m });
    try {
      const metadata = await sock.newsletterMetadata('invite', link);
      await sock.sendMessage(from, { text: `📢 *Channel Info*\n\nName: ${metadata.name}\nID: ${metadata.id}\nFollowers: ${metadata.subscribers}` }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed: ${e.message}` }, { quoted: m });
    }
  },
};
