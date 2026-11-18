export default {
  ownerOnly: true,
  execute: async ({ sock, m, from }) => {
    try {
      const privacy = await sock.fetchPrivacySettings();
      const text = `🔒 *PRIVACY SETTINGS*\n\n` +
        `Last Seen: ${privacy.last}\n` +
        `Profile Pic: ${privacy.profile}\n` +
        `Status: ${privacy.status}\n` +
        `Read Receipts: ${privacy.readreceipts}\n` +
        `Online: ${privacy.online}\n` +
        `Groups: ${privacy.groupadd}`;
      await sock.sendMessage(from, { text }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: '❌ Failed to fetch privacy settings.' }, { quoted: m });
    }
  },
};
