import yts from 'yt-search';
import { Ytdl } from '@distube/ytdl-core';
import { createWriteStream } from 'node:fs';
import { readFile, unlink } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import { pipeline } from 'node:stream/promises';

const yt = new Ytdl();

function runFFmpeg(videoPath, audioPath, outputPath) {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', [
      '-y',
      '-i', videoPath,
      '-i', audioPath,
      '-map', '0:v:0',
      '-map', '1:a:0',
      '-c:v', 'copy',
      '-c:a', 'aac',
      '-b:a', '128k',
      '-movflags', '+faststart',
      '-shortest',
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
        reject(new Error(`FFmpeg failed: ${errorOutput.slice(-1500)}`));
      }
    });
  });
}

export default {
  aliases: ['ytmp4'],

  execute: async ({ sock, m, from, args }) => {
    const query = args.join(' ').trim();

    if (!query) {
      return sock.sendMessage(
        from,
        { text: '❌ Provide a video name or YouTube link.' },
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

      // Search YouTube
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

      // Get video information
      const info = await yt.getInfo(videoUrl);
      const title = info.videoDetails.title || 'Unknown Title';

      // Ignore unavailable and protected formats
      const available = info.formats.filter(format =>
        !format.isDrm &&
        !format.isOtf
      );

      // Find MP4 video-only formats
      const videoFormats = available.filter(format =>
        format.container === 'mp4' &&
        format.hasVideo &&
        !format.hasAudio &&
        format.height
      );

      if (!videoFormats.length) {
        throw new Error('No downloadable MP4 video-only format found.');
      }

      // Prefer highest resolution up to 360p
      const preferredVideo = videoFormats
        .filter(format => format.height <= 360)
        .sort((a, b) => b.height - a.height);

      // If 360p is unavailable, use the lowest available resolution
      const selectedVideo = preferredVideo[0] ||
        videoFormats.sort((a, b) => a.height - b.height)[0];

      // Find separate audio formats
      const audioFormats = available.filter(format =>
        format.hasAudio &&
        !format.hasVideo
      );

      if (!audioFormats.length) {
        throw new Error('No downloadable audio format found.');
      }

      // Prefer M4A audio, otherwise use the highest bitrate
      audioFormats.sort((a, b) => {
        const aM4a = a.container === 'mp4' ? 1 : 0;
        const bM4a = b.container === 'mp4' ? 1 : 0;

        if (aM4a !== bM4a) return bM4a - aM4a;

        return (b.audioBitrate || b.bitrate || 0) -
          (a.audioBitrate || a.bitrate || 0);
      });

      const selectedAudio = audioFormats[0];

      console.log(
        `[VIDEO] Video: ${selectedVideo.qualityLabel} | ITAG: ${selectedVideo.itag}`
      );

      console.log(
        `[VIDEO] Audio: ${selectedAudio.container} | ITAG: ${selectedAudio.itag}`
      );

      await sock.sendMessage(
        from,
        {
          text:
            `🎥 *${title}*\n\n` +
            `📺 Quality: ${selectedVideo.qualityLabel}\n` +
            `🔊 Audio: ${selectedAudio.container}\n\n` +
            `⏳ Downloading video and audio...`
        },
        { quoted: m }
      );

      const id = Date.now();

      const videoPath = path.join(
        os.tmpdir(),
        `xypher_video_${id}.mp4`
      );

      const audioPath = path.join(
        os.tmpdir(),
        `xypher_audio_${id}.${selectedAudio.container === 'mp4' ? 'm4a' : selectedAudio.container}`
      );

      const outputPath = path.join(
        os.tmpdir(),
        `xypher_merged_${id}.mp4`
      );

      tempFiles.push(videoPath, audioPath, outputPath);

      // Download video stream
      console.log('[VIDEO] Downloading video...');

      await pipeline(
        yt.download(info, { format: selectedVideo }),
        createWriteStream(videoPath)
      );

      // Download audio stream
      console.log('[VIDEO] Downloading audio...');

      await pipeline(
        yt.download(info, { format: selectedAudio }),
        createWriteStream(audioPath)
      );

      // Merge video and audio using FFmpeg
      console.log('[VIDEO] Merging streams...');

      await runFFmpeg(
        videoPath,
        audioPath,
        outputPath
      );

      // Read merged MP4
      const videoBuffer = await readFile(outputPath);

      if (!videoBuffer.length) {
        throw new Error('Merged video is empty.');
      }

      // Send to WhatsApp
      await sock.sendMessage(
        from,
        {
          video: videoBuffer,
          caption:
            `🎥 *${title}*\n\n` +
            `📺 Quality: ${selectedVideo.qualityLabel}\n` +
            `⚡ Powered by XYPHER-X`,
          mimetype: 'video/mp4'
        },
        { quoted: m }
      );

      console.log(`[VIDEO] Successfully sent: ${title}`);

    } catch (error) {
      console.error('[VIDEO ERROR]', error);

      await sock.sendMessage(
        from,
        {
          text: `❌ Video download failed.\n\nReason: ${error.message}`
        },
        { quoted: m }
      ).catch(() => {});

    } finally {
      // Clean up all temporary files
      await Promise.all(
        tempFiles.map(file => unlink(file).catch(() => {}))
      );
    }
  }
};
