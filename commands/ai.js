import axios from 'axios';

export default {
  aliases: ['gpt', 'qwen', 'allam'],
  execute: async ({ sock, m, from, args, command }) => {
    const prompt = args.join(' ');
    if (!prompt) return sock.sendMessage(from, { text: `❌ Please provide a prompt. E.g., .${command} What is the capital of France?` }, { quoted: m });

    await sock.sendMessage(from, { text: '🧠 Thinking...' }, { quoted: m });

    try {
      // Using Pollinations AI (Free, no API key required, supports GPT-4/Claude equivalent)
      const apiUrl = `https://text.pollinations.ai/${encodeURIComponent(prompt)}`;
      const { data } = await axios.get(apiUrl);

      const responseText = typeof data === 'string' ? data : JSON.stringify(data);
      const finalText = `🤖 *${command.toUpperCase()} AI*\n\n${responseText}`;

      await sock.sendMessage(from, { text: finalText }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ AI Error: ${e.message}` }, { quoted: m });
    }
  },
};
