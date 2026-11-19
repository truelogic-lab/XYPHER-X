export default { execute: async (ctx) => { const { default: sticker } = await import('./sticker.js'); await sticker.execute(ctx); } };
