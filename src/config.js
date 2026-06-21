// Build-time config. Vite inlines import.meta.env.VITE_* at build. Set VITE_API_BASE_URL when
// building for production (e.g. VITE_API_BASE_URL=https://api.wh11ed.ru npm run build); the
// default targets a local wh11ed-api dev server.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787'
