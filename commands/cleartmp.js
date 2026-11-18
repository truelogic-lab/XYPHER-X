import fs from 'fs';
import os from 'os';
import path from 'path';

export default {
  ownerOnly: true,
  execute: async ({ sock, m, from }) => {
    const tmpDir = os.tmpdir();
    const files = fs.readdirSync(tmpDir).filter(f => f.startsWith('in_') || f.startsWith('out_'));
    
    let count = 0;
    for (const file of files) {
      try {
        fs.unlinkSync(path.join(tmpDir, file));
        count++;
      } catch (e) {}
    }
    
    await sock.sendMessage(from, { text: `✅ Cleared *${count}* temporary files.` }, { quoted: m });
  },
};
