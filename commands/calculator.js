export default { execute: async (ctx) => { const { default: calc } = await import('./calc.js'); await calc.execute(ctx); } };
