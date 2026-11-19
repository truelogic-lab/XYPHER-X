export default { execute: async (ctx) => { const { default: vv } = await import('./vv.js'); await vv.execute(ctx); } };
