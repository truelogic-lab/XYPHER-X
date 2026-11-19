import axios from 'axios';

export default {
  execute: async ({ sock, m, from, args }) => {
    const city = args.join(' ');
    if (!city) return sock.sendMessage(from, { text: '❌ Provide a city name.' }, { quoted: m });

    try {
      const res = await axios.get(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
      const data = res.data;
      const current = data.current_condition[0];
      const area = data.nearest_area[0];

      const text = `🌤️ *WEATHER IN ${area.areaName[0].value.toUpperCase()}*\n\n` +
        `🌡️ *Temp:* ${current.temp_C}°C (Feels like ${current.FeelsLikeC}°C)\n` +
        `☁️ *Condition:* ${current.weatherDesc[0].value}\n` +
        `💧 *Humidity:* ${current.humidity}%\n` +
        `💨 *Wind:* ${current.windspeedKmph} km/h`;

      await sock.sendMessage(from, { text }, { quoted: m });
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed to fetch weather. Check the city name.` }, { quoted: m });
    }
  },
};
