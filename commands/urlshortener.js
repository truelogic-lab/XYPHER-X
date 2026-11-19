export default { execute: async (ctx) => { const { default: shorturl } = await import('./shorturl.js'); await shorturl.execute(ctx); } };
