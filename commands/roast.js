const roasts = ["You're not stupid; you just have bad luck when thinking.", "I'd agree with you but then we'd both be wrong."];
export default { execute: async ({ sock, m, from }) => { await sock.sendMessage(from, { text: `🔥 *ROAST*\n\n${roasts[Math.floor(Math.random() * roasts.length)]}` }, { quoted: m }); }};
