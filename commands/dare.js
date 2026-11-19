const dares = ["Send a selfie right now.", "Text your crush 'I like you'.", "Do 20 pushups."];
export default {
  execute: async ({ sock, m, from }) => {
    const dare = dares[Math.floor(Math.random() * dares.length)];
    await sock.sendMessage(from, { text: `😈 *DARE*\n\n${dare}` }, { quoted: m });
  }
};
