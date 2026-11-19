import yts from 'yt-search';
import { Ytdl } from '@distube/ytdl-core';
import { createWriteStream } from 'node:fs';
import { readFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { pipeline } from 'node:stream/promises';

const yt = new Ytdl();

function convertToMp3(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', [
      '-y',
      '-i', inputPath,
      '-vn',
      '-codec:a', 'libmp3lame',
      '-b:a', '128k',
      outputPath
    ]);

    let errorOutput = '';

    ffmpeg.stderr.on('data', data => {
      errorOutput += data.toString();
    });

    ffmpeg.on('error', reject);

    ffmpeg.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`FFmpeg conversion failed: ${errorOutput.slice(-1000)}`));
      }
    });
  });
}

export default {
  aliases: ['play', 'ytmp3', 'music', 'mp3'],

  execute: async ({ sock, m, from, args }) => {
    const query = args.join(' ').trim();

    if (!query) {
      return sock.sendMessage(
        from,
        { text: '❌ Provide a song name or YouTube link.' },
        { quoted: m }
      );
    }

    const tempFiles = [];

    try {
      await sock.sendMessage(
        from,
        { text: `🔍 Searching for *${query}*...` },
        { quoted: m }
      );

      let videoUrl = query;

      if (
        !query.includes('youtube.com') &&
        !query.includes('youtu.be')
      ) {
        const { videos } = await yts(query);

        if (!videos.length) {
          return sock.sendMessage(
            from,
            { text: '❌ No results found.' },
            { quoted: m }
          );
        }

        videoUrl = videos[0].url;
      }

      const info = await yt.getInfo(videoUrl);
      const title = info.videoDetails.title || 'Unknown Title';

      const audioFormats = info.formats.filter(format =>
        !format.isDrm &&
        !format.isOtf &&
        format.hasAudio
      );

      if (!audioFormats.length) {
        throw new Error('No downloadable audio format found.');
      }

      audioFormats.sort((a, b) => {
        const aAudioOnly = !a.hasVideo ? 1 : 0;
        const bAudioOnly = !b.hasVideo ? 1 : 0;

        if (aAudioOnly !== bAudioOnly) {
          return bAudioOnly - aAudioOnly;
        }

        return (b.audioBitrate || b.bitrate || 0) -
          (a.audioBitrate || a.bitrate || 0);
      });

      const selectedAudio = audioFormats[0];

      const id = Date.now();

      const inputPath = path.join(os.tmpdir(), `xypher_audio_${id}.${selectedAudio.container || 'tmp'}`);
      const outputPath = path.join(os.tmpdir(), `xypher_song_${id}.mp3`);

      tempFiles.push(inputPath, outputPath);

      await sock.sendMessage(
        from,
        {
          text: `🎵 *${title}*\n\n⏳ Downloading audio...`
        },
        { quoted: m }
      );

      console.log(`[SONG] Downloading: ${title}`);

      await pipeline(
        yt.download(info, { format: selectedAudio }),
        createWriteStream(inputPath)
      );

      console.log('[SONG] Converting to MP3...');

      await convertToMp3(inputPath, outputPath);

      const audioBuffer = await readFile(outputPath);

      if (!audioBuffer.length) {
        throw new Error('The converted audio file is empty.');
      }

      await sock.sendMessage(
        from,
        {
          audio: audioBuffer,
          mimetype: 'audio/mpeg',
          fileName: `${title.replace(/[\\/:*?"<>|]/g, '_')}.mp3`,
          ptt: false
        },
        { quoted: m }
      );

      console.log(`[SONG] Successfully sent: ${title}`);

    } catch (error) {
      console.error('[SONG ERROR]', error);

      await sock.sendMessage(
        from,
        { text: `❌ Song download failed.\n\nReason: ${error.message}` },
        { quoted: m }
      ).catch(() => {});

    } finally {
      await Promise.all(
        tempFiles.map(file => unlink(file).catch(() => {}))
      );
    }
  }
};
