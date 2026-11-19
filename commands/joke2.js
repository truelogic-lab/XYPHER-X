export default {
  execute: async ({ sock, m, from }) => {
    await sock.sendMessage(from, { text: `😂 *JOKE*\n\nWhy don't skeletons fight each other?\nThey don't have the guts.` }, { quoted: m });
  }
};
