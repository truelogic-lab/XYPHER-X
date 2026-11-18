import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  execute: async ({ sock, m, from, args }) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Groups only.' }, { quoted: m });
    let target = m.message.extendedTextMessage?.contextInfo?.participant || (args[0] ? args[0].replace(/\D/g, '') + '@s.whatsapp.net' : null);
    if (!target) return sock.sendMessage(from, { text: '❌ Tag someone.' }, { quoted: m });
    
    const metadata = await sock.groupMetadata(from);
    const participant = metadata.participants.find(p => p.id === target || p.lid === target);
    
    let cleanNumber;
    if (participant) {
      const rawId = participant.phoneNumber || participant.id; 
      cleanNumber = rawId.split('@')[0].split(':')[0];
    } else {
      cleanNumber = target.split('@')[0].split(':')[0];
    }
    
    const jid = `${cleanNumber}@s.whatsapp.net`;
    const reason = args.slice(1).join(' ') || 'No reason provided';
    const warnPath = path.join(__dirname, '..', 'data', 'warnings.json');
    const data = JSON.parse(fs.readFileSync(warnPath, 'utf8'));
    
    if (!data[from]) data[from] = {};
    if (!data[from][jid]) data[from][jid] = 0;
    
    data[from][jid] += 1;
    fs.writeFileSync(warnPath, JSON.stringify(data, null, 2));

    if (data[from][jid] >= 3) {
      await sock.sendMessage(from, { text: `🚨 @${cleanNumber} reached 3 warnings and will be kicked!\nReason: ${reason}`, mentions: [jid] });
      await sock.groupParticipantsUpdate(from, [jid], 'remove').catch(() => {});
      delete data[from][jid];
      fs.writeFileSync(warnPath, JSON.stringify(data, null, 2));
    } else {
      await sock.sendMessage(from, { text: `⚠️ *WARNING ${data[from][jid]}/3*\nUser: @${cleanNumber}\nReason: ${reason}`, mentions: [jid] });
    }
  },
};
