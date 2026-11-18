export default {
  ownerOnly: true,
  execute: async ({ sock, m, from }) => {
    const groups = await sock.groupFetchAllParticipating();
    let text = '👥 *YOUR GROUPS*\n\n';
    let count = 1;
    for (const id in groups) {
      text += `${count++}. *${groups[id].subject}*\n`;
    }
    await sock.sendMessage(from, { text }, { quoted: m });
  },
};
