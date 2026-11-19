import { downloadMediaMessage } from '@whiskeysockets/baileys'; import { exec } from 'child_process'; import fs from 'fs'; import path from 'path'; import os from 'os';
export default { execute: async ({ sock, m, from }) => {
  const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  if (!quoted?.audioMessage) return sock.sendMessage(from, { text: '❌ Reply to audio.' });
  const inP = path.join(os.tmpdir(), `i${Date.now()}`); const outP = path.join(os.tmpdir(), `o${Date.now()}.mp3`);
  fs.writeFileSync(inP, await downloadMediaMessage({ message: quoted, key: m.key }, 'buffer', {}, {}));
  exec(`ffmpeg -i "${inP}" -af "asetrate=44100*1.5,atempo=1.2" "${outP}"`, async (err) => {
    if (!err) await sock.sendMessage(from, { audio: fs.readFileSync(outP), mimetype: 'audio/mp4' }, { quoted: m });
    fs.unlinkSync(inP); if (fs.existsSync(outP)) fs.unlinkSync(outP);
  });
}}
