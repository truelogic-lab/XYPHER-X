export default { execute: async (ctx) => { const { default: translate } = await import('./translate.js'); await translate.execute(ctx); } };
