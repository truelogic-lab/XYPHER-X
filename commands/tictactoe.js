export default { execute: async (ctx) => { const { default: ttt } = await import('./ttt.js'); await ttt.execute(ctx); } };
