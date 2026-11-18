import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  execute: async ({ sock, m, from, settings, ownerData, commands }) => {
    const start = Date.now();
    const uptime = process.uptime();
    const h = Math.floor(uptime / 3600);
    const min = Math.floor((uptime % 3600) / 60);
    const s = Math.floor(uptime % 60);
    const uptimeStr = `${h}h ${min}m ${s}s`;

    // Calculate a quick ping
    const ping = Date.now() - start;

    // Count unique commands loaded
    const count = new Set(commands.values()).size;

    const text = `╭━━━『 🟢 𝐁𝐎𝐓 𝐒𝐓𝐀𝐓𝐔𝐒 』━━━⬣
┃ 🤖 Bot: *❄️🌹${settings.botName}🌹❄️*
┃ 👑 Owner: *Hector Manuel*
┃ 🟢 Status: *Online*
┃ 🌍 Mode: *${ownerData.mode || 'public'}*
┃ ⚙️ Prefix: *${settings.prefix}*
┃ ⏱️ Uptime: *${uptimeStr}*
┃ 📶 Ping: *${ping}ms*
┃ 🔖 Version: *v3.0.0*
┃ 📚 Commands: *${count}*
┃ 💎 Plan: *Free*
╰━━━━━━━━━━━━━━━━━━⬣

💡 Type *${settings.prefix}menu* to see every command.`;

    // Look for alive.png, if not found use menu.png
    const imagePath = path.join(__dirname, '..', 'assets', 'alive.png');
    const fallbackPath = path.join(__dirname, '..', 'assets', 'menu.png');

    try {
      if (fs.existsSync(imagePath)) {
        await sock.sendMessage(from, { 
          image: fs.readFileSync(imagePath), 
          caption: text 
        }, { quoted: m });
      } else if (fs.existsSync(fallbackPath)) {
        await sock.sendMessage(from, { 
          image: fs.readFileSync(fallbackPath), 
          caption: text 
        }, { quoted: m });
      } else {
        await sock.sendMessage(from, { text }, { quoted: m });
      }
    } catch (error) {
      await sock.sendMessage(from, { text }, { quoted: m });
    }
  },
};
