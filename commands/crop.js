import { downloadMediaMessage } from '@whiskeysockets/baileys'; import { exec } from 'child_process'; import fs from 'fs'; import path from 'path'; import os from 'os';
export default { execute: async ({ sock, m, from }) => {
  const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  if (!quoted?.imageMessage) return sock.sendMessage(from, { text: '❌ Reply to an image.' });
  const inP = path.join(os.tmpdir(), `i${Date.now()}`); const outP = path.join(os.tmpdir(), `o${Date.now()}.jpg`);
  fs.writeFileSync(inP, await downloadMediaMessage({ message: quoted, key: m.key }, 'buffer', {}, {}));
  exec(`ffmpeg -i "${inP}" -vf "crop=iw/2:ih/2" "${outP}"`, async (err) => {
    if (!err) await sock.sendMessage(from, { image: fs.readFileSync(outP), caption: '✂️ Cropped' }, { quoted: m });
    fs.unlinkSync(inP); if (fs.existsSync(outP)) fs.unlinkSync(outP);
  });
}}
