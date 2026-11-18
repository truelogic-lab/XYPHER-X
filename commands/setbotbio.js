export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, args }) => {
    const bio = args.join(' ');
    if (!bio) return sock.sendMessage(from, { text: '❌ Provide a bio text.' }, { quoted: m });
    
    await sock.updateProfileStatus(bio);
    await sock.sendMessage(from, { text: `✅ Bot bio updated to: ${bio}` }, { quoted: m });
  },
};
