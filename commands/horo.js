export default {
  execute: async ({ sock, m, from, args }) => {
    const sign = args[0]?.toLowerCase();
    if (!sign) return sock.sendMessage(from, { text: '❌ Provide a zodiac sign. E.g. .horo aries' }, { quoted: m });

    const horoscopes = {
      aries: "Your energy is high today. Focus on completing tasks you've been putting off. A surprise message will bring a smile to your face.",
      taurus: "Financial opportunities are on the horizon. Be patient and trust your instincts. A relaxing evening is needed.",
      gemini: "Your communication skills are sharp today. Use them to resolve a conflict. Good news from a friend is on the way.",
      cancer: "Focus on self-care today. Your intuition is guiding you correctly. Spend time with family if possible.",
      leo: "You are the center of attention today. Use your charm for good and pursue a new hobby or creative project.",
      virgo: "Details matter today. Your analytical skills will impress someone in authority. Avoid overthinking things tonight.",
      libra: "Balance is key. You may need to mediate a disagreement. A romantic gesture will boost your mood.",
      scorpio: "Your determination is unstoppable. Dive deep into a project you are passionate about. Keep your secrets safe today.",
      sagittarius: "Adventure is calling! It's a great day to learn something new or plan a future trip. Stay optimistic.",
      capricorn: "Hard work pays off today. You might get recognition from a superior. Take a well-deserved break later.",
      aquarius: "Your innovative ideas will be appreciated. Don't be afraid to stand out from the crowd. Network with like-minded people.",
      pisces: "Your creativity is flowing. Listen to music or do some art. Trust your dreams; they are trying to tell you something."
    };

    const horoscope = horoscopes[sign];
    if (!horoscope) return sock.sendMessage(from, { text: '❌ Invalid zodiac sign. Choose from: aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces.' }, { quoted: m });

    await sock.sendMessage(from, { text: `🔮 *HOROSCOPE: ${sign.toUpperCase()}*\n\n${horoscope}` }, { quoted: m });
  }
};
