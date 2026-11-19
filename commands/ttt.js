export default {
  aliases: ['tictactoe'],
  execute: async ({ sock, m, from }) => {
    await sock.sendMessage(from, { text: `❌ *Tic Tac Toe*\n\nThis requires a multiplayer state. Coming soon in V4!` }, { quoted: m });
  }
};
