export default { execute: async (ctx) => { const { default: song } = await import('./song.js'); await song.execute(ctx); } };
