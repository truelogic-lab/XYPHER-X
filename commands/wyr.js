const options = ["Be rich but ugly", "Be poor but attractive", "Have super speed", "Have super strength"];
export default {
  execute: async ({ sock, m, from }) => {
    const [opt1, opt2] = options.sort(() => 0.5 - Math.random());
    await sock.sendMessage(from, { text: `🤔 *WOULD YOU RATHER*\n\n🅰️ ${opt1}\n🅱️ ${opt2}` }, { quoted: m });
  }
};
