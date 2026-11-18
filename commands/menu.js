import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagePath = path.join(__dirname, '..', 'assets', 'menu.png');

// Cache the image in RAM so we don't read from the disk every time
let cachedImage = null;

function formatUptime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}

export default {
  aliases: ['help'],
  execute: async ({ sock, m, from, settings }) => {
    const date = new Date().toLocaleString();
    const uptime = formatUptime(process.uptime());

    const menuText = `╔════════◇◆◇═══════╗
├ *❄️🌹${settings.botName}🌹❄️* 
├▢👑 Owner: *Warren Musungu*
├▢🕐 *${date}*
├▢⏱️ Uptime: *${uptime}*
├▢📶 Ping: *${Math.floor(Math.random() * 20) + 10}ms*
├▢🔖 Version: *v3.0.0*
├▢📚 Commands: *373*
├▢🌐 *Free Bot:*
https://xyper-x.com
╚════════◇◆◇═══════╝

╔═══════════════╗
  👑 *OWNER*
╠───────────────╣
║ ➣ ${settings.prefix}mode
║ ➣ ${settings.prefix}settings
║ ➣ ${settings.prefix}password
║ ➣ ${settings.prefix}setprefix
║ ➣ ${settings.prefix}delprefix
║ ➣ ${settings.prefix}setpp
║ ➣ ${settings.prefix}setbotbio
║ ➣ ${settings.prefix}autobio
║ ➣ ${settings.prefix}autostatus
║ ➣ ${settings.prefix}autotyping
║ ➣ ${settings.prefix}autorecording
║ ➣ ${settings.prefix}autoreact
║ ➣ ${settings.prefix}anticall
║ ➣ ${settings.prefix}antidelete
║ ➣ ${settings.prefix}antideletestatus
║ ➣ ${settings.prefix}addsudo
║ ➣ ${settings.prefix}delsudo
║ ➣ ${settings.prefix}sudolist
║ ➣ ${settings.prefix}block
║ ➣ ${settings.prefix}unblock
║ ➣ ${settings.prefix}ban
║ ➣ ${settings.prefix}unban
║ ➣ ${settings.prefix}save
║ ➣ ${settings.prefix}schedulestatus
║ ➣ ${settings.prefix}reshare
║ ➣ ${settings.prefix}chatbot
║ ➣ ${settings.prefix}clearsession
║ ➣ ${settings.prefix}cleartmp
║ ➣ ${settings.prefix}pair
║ ➣ ${settings.prefix}checkidch
║ ➣ ${settings.prefix}archive
║ ➣ ${settings.prefix}unarchive
║ ➣ ${settings.prefix}chatpin
║ ➣ ${settings.prefix}unpin
║ ➣ ${settings.prefix}markread
║ ➣ ${settings.prefix}markunread
║ ➣ ${settings.prefix}unmutechat
║ ➣ ${settings.prefix}profilename
║ ➣ ${settings.prefix}fullphoto
║ ➣ ${settings.prefix}removephoto
║ ➣ ${settings.prefix}join
║ ➣ ${settings.prefix}listgc
║ ➣ ${settings.prefix}edit
║ ➣ ${settings.prefix}forward
║ ➣ ${settings.prefix}getprivacy
║ ➣ ${settings.prefix}lastseen
║ ➣ ${settings.prefix}mypp
║ ➣ ${settings.prefix}mystatus
║ ➣ ${settings.prefix}read
║ ➣ ${settings.prefix}groupadd
║ ➣ ${settings.prefix}privacy
╚═══════════════╝

╔═══════════════╗
  💻 *BOT*
╠───────────────╣
║ ➣ ${settings.prefix}owner
║ ➣ ${settings.prefix}ping
║ ➣ ${settings.prefix}alive
║ ➣ ${settings.prefix}runtime
║ ➣ ${settings.prefix}repo
╚═══════════════╝

╔═══════════════╗
  👥 *GROUP*
╠───────────────╣
║ ➣ ${settings.prefix}add
║ ➣ ${settings.prefix}kick
║ ➣ ${settings.prefix}kickall
║ ➣ ${settings.prefix}promote
║ ➣ ${settings.prefix}demote
║ ➣ ${settings.prefix}mute
║ ➣ ${settings.prefix}unmute
║ ➣ ${settings.prefix}lockgroup
║ ➣ ${settings.prefix}unlockgroup
║ ➣ ${settings.prefix}revoke
║ ➣ ${settings.prefix}grouplink
║ ➣ ${settings.prefix}setname
║ ➣ ${settings.prefix}setdesc
║ ➣ ${settings.prefix}setgcpp
║ ➣ ${settings.prefix}gcstatus
║ ➣ ${settings.prefix}newgroup
║ ➣ ${settings.prefix}leavegc
║ ➣ ${settings.prefix}groupinfo
║ ➣ ${settings.prefix}staff
║ ➣ ${settings.prefix}jid
║ ➣ ${settings.prefix}tagall
║ ➣ ${settings.prefix}tag
║ ➣ ${settings.prefix}hidetag
║ ➣ ${settings.prefix}tagadmins
║ ➣ ${settings.prefix}online
║ ➣ ${settings.prefix}onlineusers
║ ➣ ${settings.prefix}onlineadmins
║ ➣ ${settings.prefix}onlinestats
║ ➣ ${settings.prefix}welcome
║ ➣ ${settings.prefix}goodbye
║ ➣ ${settings.prefix}rules
║ ➣ ${settings.prefix}poll
║ ➣ ${settings.prefix}afk
║ ➣ ${settings.prefix}couple
║ ➣ ${settings.prefix}antilink
║ ➣ ${settings.prefix}antitag
║ ➣ ${settings.prefix}antigroupmention
║ ➣ ${settings.prefix}antigroupstatus
║ ➣ ${settings.prefix}antibot
║ ➣ ${settings.prefix}antibadword
║ ➣ ${settings.prefix}antispam
║ ➣ ${settings.prefix}slowmode
║ ➣ ${settings.prefix}warn
║ ➣ ${settings.prefix}warnings
║ ➣ ${settings.prefix}antifakenumber
║ ➣ ${settings.prefix}adminalerts
║ ➣ ${settings.prefix}antiword
║ ➣ ${settings.prefix}enable
║ ➣ ${settings.prefix}disable
║ ➣ ${settings.prefix}lockat
║ ➣ ${settings.prefix}unlockat
║ ➣ ${settings.prefix}cancellock
║ ➣ ${settings.prefix}cancelunlock
║ ➣ ${settings.prefix}acceptall
║ ➣ ${settings.prefix}rejectall
║ ➣ ${settings.prefix}listrequest
║ ➣ ${settings.prefix}linkinfo
║ ➣ ${settings.prefix}fullgroupphoto
║ ➣ ${settings.prefix}checkwarn
║ ➣ ${settings.prefix}resetwarn
║ ➣ ${settings.prefix}gcset
║ ➣ ${settings.prefix}tagnotadmin
╚═══════════════╝

╔═══════════════╗
  🤖 *AI*
╠───────────────╣
║ ➣ ${settings.prefix}ai
║ ➣ ${settings.prefix}gpt
║ ➣ ${settings.prefix}qwen
║ ➣ ${settings.prefix}allam
║ ➣ ${settings.prefix}imagine
║ ➣ ${settings.prefix}flux
║ ➣ ${settings.prefix}dalle
║ ➣ ${settings.prefix}txt2video
║ ➣ ${settings.prefix}sora
║ ➣ ${settings.prefix}imageedit
║ ➣ ${settings.prefix}diffusion
╚═══════════════╝

╔═══════════════╗
  📥 *DOWNLOADER*
╠───────────────╣
║ ➣ ${settings.prefix}play
║ ➣ ${settings.prefix}song
║ ➣ ${settings.prefix}music
║ ➣ ${settings.prefix}ytmp3
║ ➣ ${settings.prefix}mp3
║ ➣ ${settings.prefix}ytmp4
║ ➣ ${settings.prefix}video
║ ➣ ${settings.prefix}instagram
║ ➣ ${settings.prefix}tiktok
║ ➣ ${settings.prefix}tt
║ ➣ ${settings.prefix}facebook
║ ➣ ${settings.prefix}fb
║ ➣ ${settings.prefix}pinterest
║ ➣ ${settings.prefix}anime
║ ➣ ${settings.prefix}movie
║ ➣ ${settings.prefix}cinesubz
║ ➣ ${settings.prefix}fwd
║ ➣ ${settings.prefix}gitclone
║ ➣ ${settings.prefix}apk
║ ➣ ${settings.prefix}pixabay
║ ➣ ${settings.prefix}gif
║ ➣ ${settings.prefix}tourl
║ ➣ ${settings.prefix}mediafire
║ ➣ ${settings.prefix}xdown
║ ➣ ${settings.prefix}ytdoc
║ ➣ ${settings.prefix}ringtone
║ ➣ ${settings.prefix}wikimedia
╚═══════════════╝

╔═══════════════╗
  🎚️ *AUDIO*
╠───────────────╣
║ ➣ ${settings.prefix}bass
║ ➣ ${settings.prefix}deep
║ ➣ ${settings.prefix}blown
║ ➣ ${settings.prefix}earrape
║ ➣ ${settings.prefix}fast
║ ➣ ${settings.prefix}slow
║ ➣ ${settings.prefix}fat
║ ➣ ${settings.prefix}squirrel
║ ➣ ${settings.prefix}nightcore
║ ➣ ${settings.prefix}robot
║ ➣ ${settings.prefix}areverse
║ ➣ ${settings.prefix}8d
║ ➣ ${settings.prefix}echo
║ ➣ ${settings.prefix}reverb
║ ➣ ${settings.prefix}vibrato
║ ➣ ${settings.prefix}tremolo
║ ➣ ${settings.prefix}radio
║ ➣ ${settings.prefix}alien
║ ➣ ${settings.prefix}audiofx
║ ➣ ${settings.prefix}tomp3
║ ➣ ${settings.prefix}tts
╚═══════════════╝

╔═══════════════╗
  🎨 *CONVERTER*
╠───────────────╣
║ ➣ ${settings.prefix}sticker
║ ➣ ${settings.prefix}s
║ ➣ ${settings.prefix}simage
║ ➣ ${settings.prefix}toimg
║ ➣ ${settings.prefix}removebg
║ ➣ ${settings.prefix}upscale
║ ➣ ${settings.prefix}take
║ ➣ ${settings.prefix}attp
║ ➣ ${settings.prefix}qc
║ ➣ ${settings.prefix}emojimix
║ ➣ ${settings.prefix}tgsticker
║ ➣ ${settings.prefix}blur
║ ➣ ${settings.prefix}meme
║ ➣ ${settings.prefix}getpp
║ ➣ ${settings.prefix}wasted
║ ➣ ${settings.prefix}character
║ ➣ ${settings.prefix}crop
║ ➣ ${settings.prefix}circle
║ ➣ ${settings.prefix}round
║ ➣ ${settings.prefix}ttp
║ ➣ ${settings.prefix}brat
║ ➣ ${settings.prefix}memegen
║ ➣ ${settings.prefix}tomp4
║ ➣ ${settings.prefix}tovn
╚═══════════════╝

╔═══════════════╗
  🔤 *LOGO MAKER*
╠───────────────╣
║ ➣ ${settings.prefix}fancy
║ ➣ ${settings.prefix}gfx
║ ➣ ${settings.prefix}gfx2
║ ➣ ${settings.prefix}gfx3
║ ➣ ${settings.prefix}gfx4
║ ➣ ${settings.prefix}gfx5
║ ➣ ${settings.prefix}gfx6
║ ➣ ${settings.prefix}gfx7
║ ➣ ${settings.prefix}gfx8
║ ➣ ${settings.prefix}gfx9
║ ➣ ${settings.prefix}gfx10
║ ➣ ${settings.prefix}gfx11
║ ➣ ${settings.prefix}gfx12
║ ➣ ${settings.prefix}metallic
║ ➣ ${settings.prefix}ice
║ ➣ ${settings.prefix}snow
║ ➣ ${settings.prefix}impressive
║ ➣ ${settings.prefix}matrix
║ ➣ ${settings.prefix}neon
║ ➣ ${settings.prefix}light
║ ➣ ${settings.prefix}devil
║ ➣ ${settings.prefix}purple
║ ➣ ${settings.prefix}thunder
║ ➣ ${settings.prefix}leaves
║ ➣ ${settings.prefix}1917
║ ➣ ${settings.prefix}arena
║ ➣ ${settings.prefix}hacker
║ ➣ ${settings.prefix}sand
║ ➣ ${settings.prefix}blackpink
║ ➣ ${settings.prefix}glitch
║ ➣ ${settings.prefix}fire
║ ➣ ${settings.prefix}slice
║ ➣ ${settings.prefix}glow
║ ➣ ${settings.prefix}gitch1
║ ➣ ${settings.prefix}steal
║ ➣ ${settings.prefix}avenger
║ ➣ ${settings.prefix}marvel
║ ➣ ${settings.prefix}glitch2
║ ➣ ${settings.prefix}grafiti
╚═══════════════╝

╔═══════════════╗
  🛠️ *TOOLS*
╠───────────────╣
║ ➣ ${settings.prefix}ss
║ ➣ ${settings.prefix}ssweb
║ ➣ ${settings.prefix}translate
║ ➣ ${settings.prefix}tr
║ ➣ ${settings.prefix}qrcode
║ ➣ ${settings.prefix}qr
║ ➣ ${settings.prefix}shorturl
║ ➣ ${settings.prefix}urlshortener
║ ➣ ${settings.prefix}calculator
║ ➣ ${settings.prefix}calc
║ ➣ ${settings.prefix}hash
║ ➣ ${settings.prefix}base64
║ ➣ ${settings.prefix}binary
║ ➣ ${settings.prefix}encrypt
║ ➣ ${settings.prefix}decrypt
║ ➣ ${settings.prefix}timestamp
║ ➣ ${settings.prefix}currency
║ ➣ ${settings.prefix}crypto
║ ➣ ${settings.prefix}weather
║ ➣ ${settings.prefix}news
║ ➣ ${settings.prefix}livescore
║ ➣ ${settings.prefix}reminder
║ ➣ ${settings.prefix}lyrics
║ ➣ ${settings.prefix}count
║ ➣ ${settings.prefix}reverse
║ ➣ ${settings.prefix}case
║ ➣ ${settings.prefix}palindrome
║ ➣ ${settings.prefix}age
║ ➣ ${settings.prefix}vv
║ ➣ ${settings.prefix}vv2
║ ➣ ${settings.prefix}delete
║ ➣ ${settings.prefix}savecontact
║ ➣ ${settings.prefix}device
║ ➣ ${settings.prefix}netflix
║ ➣ ${settings.prefix}paste
║ ➣ ${settings.prefix}fliptext
║ ➣ ${settings.prefix}binarytotext
║ ➣ ${settings.prefix}readmore
║ ➣ ${settings.prefix}cpu
║ ➣ ${settings.prefix}npm
║ ➣ ${settings.prefix}imdb
║ ➣ ${settings.prefix}horo
║ ➣ ${settings.prefix}google
║ ➣ ${settings.prefix}image
║ ➣ ${settings.prefix}define
║ ➣ ${settings.prefix}grayscale
║ ➣ ${settings.prefix}invert
║ ➣ ${settings.prefix}sepia
║ ➣ ${settings.prefix}sharpen
║ ➣ ${settings.prefix}readqr
║ ➣ ${settings.prefix}qmaker
║ ➣ ${settings.prefix}smallcaps
║ ➣ ${settings.prefix}flip
║ ➣ ${settings.prefix}stext
║ ➣ ${settings.prefix}ephoto
║ ➣ ${settings.prefix}excard
║ ➣ ${settings.prefix}forwarded
║ ➣ ${settings.prefix}wiki
║ ➣ ${settings.prefix}element
║ ➣ ${settings.prefix}wattpad
║ ➣ ${settings.prefix}ytsearch
║ ➣ ${settings.prefix}scloud
║ ➣ ${settings.prefix}shazam
╚═══════════════╝

╔═══════════════╗
  🕵️ *STALK*
╠───────────────╣
║ ➣ ${settings.prefix}gitstalk
║ ➣ ${settings.prefix}npmstalk
║ ➣ ${settings.prefix}tgstalk
║ ➣ ${settings.prefix}ttstalk
║ ➣ ${settings.prefix}xstalk
║ ➣ ${settings.prefix}thrstalk
║ ➣ ${settings.prefix}pinstalk
║ ➣ ${settings.prefix}genshin
╚═══════════════╝

╔═══════════════╗
  🎮 *GAMES*
╠───────────────╣
║ ➣ ${settings.prefix}trivia
║ ➣ ${settings.prefix}scramble
║ ➣ ${settings.prefix}wordle
║ ➣ ${settings.prefix}hangman
║ ➣ ${settings.prefix}guess
║ ➣ ${settings.prefix}ttt
║ ➣ ${settings.prefix}tictactoe
║ ➣ ${settings.prefix}wyr
║ ➣ ${settings.prefix}rps
║ ➣ ${settings.prefix}slots
║ ➣ ${settings.prefix}truth
║ ➣ ${settings.prefix}dare
║ ➣ ${settings.prefix}riddle
║ ➣ ${settings.prefix}8ball
║ ➣ ${settings.prefix}dice
║ ➣ ${settings.prefix}coin
║ ➣ ${settings.prefix}random
║ ➣ ${settings.prefix}pick
╚═══════════════╝

╔═══════════════╗
  🎯 *FUN*
╠───────────────╣
║ ➣ ${settings.prefix}joke
║ ➣ ${settings.prefix}fact
║ ➣ ${settings.prefix}quote
║ ➣ ${settings.prefix}compliment
║ ➣ ${settings.prefix}insult
║ ➣ ${settings.prefix}roast
║ ➣ ${settings.prefix}flirt
║ ➣ ${settings.prefix}ship
║ ➣ ${settings.prefix}simp
║ ➣ ${settings.prefix}stupid
║ ➣ ${settings.prefix}shayari
║ ➣ ${settings.prefix}goodnight
║ ➣ ${settings.prefix}roseday
║ ➣ ${settings.prefix}iloveyou
║ ➣ ${settings.prefix}couplepp
║ ➣ ${settings.prefix}coffe
║ ➣ ${settings.prefix}quotes
║ ➣ ${settings.prefix}joke2
║ ➣ ${settings.prefix}question
║ ➣ ${settings.prefix}teddy
║ ➣ ${settings.prefix}lovemsg
╚═══════════════╝

╔═══════════════╗
  🖼️ *PIES*
╠───────────────╣
║ ➣ ${settings.prefix}pies
║ ➣ ${settings.prefix}india
║ ➣ ${settings.prefix}china
║ ➣ ${settings.prefix}japan
║ ➣ ${settings.prefix}korea
║ ➣ ${settings.prefix}thai
║ ➣ ${settings.prefix}malaysia
╚═══════════════╝

╔═══════════════╗
  🌸 *ANIME*
╠───────────────╣
║ ➣ ${settings.prefix}pokemon
║ ➣ ${settings.prefix}pokepic
║ ➣ ${settings.prefix}animepic
║ ➣ ${settings.prefix}animewall
║ ➣ ${settings.prefix}wallpaper
║ ➣ ${settings.prefix}animenews
╚═══════════════╝

╔═══════════════╗
  👑 *PREMIUM*
╠───────────────╣
║ ➣ ${settings.prefix}premium
║ ➣ ${settings.prefix}setbotpp
║ ➣ ${settings.prefix}autoreply
║ ➣ ${settings.prefix}away
║ ➣ ${settings.prefix}schedule
║ ➣ ${settings.prefix}filter
║ ➣ ${settings.prefix}persona
║ ➣ ${settings.prefix}ghost
║ ➣ ${settings.prefix}chreact
║ ➣ ${settings.prefix}pollvote
╚═══════════════╝

╔══════════════════╗
        *ABOUT US*
╠──────────────────╣
 *MultiDevice WhatsApp Bot ❤️‍🔥*
  Creator: *Hector Manuel*
  📺 t.me/xyperx
  💻 github.com/truelogic-lab
 Thanks For Using Our Bot🙏 
╚══════════════════╝`;

    try {
      // Check if image exists on disk
      if (fs.existsSync(imagePath)) {
        // Read the image ONLY if it's not already in RAM
        if (!cachedImage) {
          cachedImage = await fs.promises.readFile(imagePath);
        }
        
        await sock.sendMessage(from, { 
          image: cachedImage, 
          caption: menuText 
        }, { quoted: m });
      } else {
        await sock.sendMessage(from, { text: menuText }, { quoted: m });
      }
    } catch (error) {
      console.error('Menu error:', error);
      await sock.sendMessage(from, { text: menuText }, { quoted: m });
    }
  },
};
