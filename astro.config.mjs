// @ts-check
import { defineConfig } from 'astro/config';

// ───────────────────────────────────────────────────────────────────────────
//  KONFIGURASI ALAMAT WEBSITE
//  Default di-set untuk GitHub Pages repo "bunda-ami-atomy" milik joshuasetiawann
//  -> hasil: https://joshuasetiawann.github.io/bunda-ami-atomy/
//
//  Kalau nanti pakai domain sendiri (mis. bundaami.com) atau host di Netlify/
//  Vercel di root, cukup ubah jadi:
//      site: 'https://bundaami.com',
//      base: '/',
//  Semua link internal otomatis menyesuaikan (memakai import.meta.env.BASE_URL).
// ───────────────────────────────────────────────────────────────────────────
export default defineConfig({
  site: 'https://joshuasetiawann.github.io',
  base: '/bunda-ami-atomy',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
