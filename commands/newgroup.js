export default {
  execute: async ({ sock, m, from, args }) => {
    const name = args.join(' ');
    if (!name) return sock.sendMessage(from, { text: '❌ Provide a group name.' }, { quoted: m });
    const target = m.message.extendedTextMessage?.contextInfo?.participant;
    const participants = target ? [target] : [];
    try {
      const group = await sock.groupCreate(name, participants);
      await sock.sendMessage(from, { text: `✅ Group *${name}* created successfully!` }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed to create group: ${e.message}` }, { quoted: m });
    }
  },
};
