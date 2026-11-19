export default {
  execute: async ({ sock, m, from, args }) => {
    const text = args.join(' ') || 'No text provided';
    await sock.sendMessage(from, { text: `${text}\n\n${'\u200B'.repeat(4000)}Read more...` }, { quoted: m });
  }
};
