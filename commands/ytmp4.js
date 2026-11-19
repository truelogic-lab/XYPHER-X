export default { execute: async (ctx) => { const { default: video } = await import('./video.js'); await video.execute(ctx); } };
