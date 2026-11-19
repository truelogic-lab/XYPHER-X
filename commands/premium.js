export default {
  execute: async ({ sock, m, from }) => {
    const text = `👑 *PREMIUM PLANS*\n\n` +
      `🥉 *Basic:* 1 Session, 100 Commands/Day\n` +
      `🥈 *Pro:* 3 Sessions, Unlimited Commands\n` +
      `🥇 *Elite:* 10 Sessions, Bot Customization\n\n` +
      `💳 *Contact Owner to purchase:* wa.me/254116726222`;
    await sock.sendMessage(from, { text }, { quoted: m });
  }
};
