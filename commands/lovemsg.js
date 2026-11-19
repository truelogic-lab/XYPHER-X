export default { execute: async ({ sock, m, from }) => { await sock.sendMessage(from, { text: `💌 *LOVE MESSAGE*\n\nYou are the reason I smile every day.` }, { quoted: m }); }};
