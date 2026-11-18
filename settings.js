import dotenv from 'dotenv';
dotenv.config();

export default {
  botName: process.env.BOT_NAME || 'XYPHER-X',
  prefix: process.env.BOT_PREFIX || '.',
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY || 'secret',
};
