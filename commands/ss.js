export default { execute: async (ctx) => { const { default: ssweb } = await import('./ssweb.js'); await ssweb.execute(ctx); } };
