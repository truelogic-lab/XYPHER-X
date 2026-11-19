const truths = ["What is your biggest fear?", "What is the most embarrassing thing you've ever done?", "Who was your first crush?"];
export default {
  execute: async ({ sock, m, from }) => {
    const truth = truths[Math.floor(Math.random() * truths.length)];
    await sock.sendMessage(from, { text: `🫣 *TRUTH*\n\n${truth}` }, { quoted: m });
  }
};
