export default {
  aliases: ['creator'],
  execute: async ({ sock, m, from }) => {
    const vcard = 'BEGIN:VCARD\n'
      + 'VERSION:3.0\n'
      + 'FN:Hector Manuel\n'
      + 'ORG:XYPHER-X Developer;\n'
      + 'TEL;type=CELL;type=VOICE;waid=254136726609:+254 136 726 609\n'
      + 'END:VCARD';
      
    await sock.sendMessage(from, { 
      contacts: { 
        displayName: 'Hector Manuel', 
        contacts: [{ vcard }] 
      } 
    }, { quoted: m });
  },
};
