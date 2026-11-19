export default { execute: async (ctx) => { const { default: qr } = await import('./qr.js'); await qr.execute(ctx); } };
