export default {
  ownerOnly: true,
  execute: async ({ sock, m, from, ownerData }) => {
    const text = `⚙️ *BOT SETTINGS*\n\n` +
      `👑 Owner: ${ownerData.owner}\n` +
      `🤖 Bot Name: ${ownerData.botName}\n` +
      `🔧 Prefix: ${ownerData.prefix}\n` +
      `🔒 Mode: ${ownerData.mode}\n` +
      `📝 AutoBio: ${ownerData.autoBio}\n` +
      `📸 AutoStatus: ${ownerData.autoStatus}\n` +
      `⌨️ AutoTyping: ${ownerData.autoTyping}\n` +
      `🎤 AutoRecording: ${ownerData.autoRecording}\n` +
      `🎁 AutoReact: ${ownerData.autoReact}`;
      
    await sock.sendMessage(from, { text }, { quoted: m });
  },
};
