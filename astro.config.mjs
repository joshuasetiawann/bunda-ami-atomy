// @ts-check
import { defineConfig } from 'astro/config';

// ───────────────────────────────────────────────────────────────────────────
//  KONFIGURASI ALAMAT WEBSITE
//
//  PRODUKSI (build/preview): di-set untuk GitHub Pages repo "bunda-ami-atomy"
//      -> hasil: https://joshuasetiawann.github.io/bunda-ami-atomy/
//
//  LOKAL (npm run dev): otomatis pakai base '/' supaya bisa langsung dibuka di
//      http://localhost:4321/ tanpa kena 404.
//
//  Kalau nanti pakai domain sendiri (mis. bundaami.com) atau host di Netlify/
//  Vercel di root, ubah PROD_BASE di bawah menjadi '/'.
//  Semua link internal otomatis menyesuaikan (memakai import.meta.env.BASE_URL).
// ───────────────────────────────────────────────────────────────────────────
const PROD_BASE = '/bunda-ami-atomy';

// Deteksi apakah sedang menjalankan dev server (bukan build/preview)
const isDev =
  ['dev', 'start'].includes(process.env.npm_lifecycle_event ?? '') ||
  process.argv.includes('dev');

export default defineConfig({
  site: 'https://joshuasetiawann.github.io',
  base: isDev ? '/' : PROD_BASE,
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
