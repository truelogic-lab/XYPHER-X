import fs from 'fs';
import path from 'path';

export default {
  ownerOnly: true,
  execute: async ({ sock, m, from }) => {
    await sock.sendMessage(from, { text: '⚠️ Clearing session and logging out. The bot will restart...' }, { quoted: m });
    
    // Delete the session folder
    const myNumber = sock.user.id.split(':')[0].split('@')[0];
    const sessionDir = path.join(process.cwd(), 'session_data', myNumber);
    if (fs.existsSync(sessionDir)) {
      fs.rmSync(sessionDir, { recursive: true, force: true });
    }

    // Give it 2 seconds to send the message, then exit
    setTimeout(() => {
      process.exit(1); 
    }, 2000);
  },
};
