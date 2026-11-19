const flirts = ["Are you a magician? Because whenever I look at you, everyone else disappears.", "Do you have a map? I keep getting lost in your eyes."];
export default { execute: async ({ sock, m, from }) => { await sock.sendMessage(from, { text: `😉 *FLIRT*\n\n${flirts[Math.floor(Math.random() * flirts.length)]}` }, { quoted: m }); }};
