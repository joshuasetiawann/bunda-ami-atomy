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

// GitHub Actions SELALU menyetel GITHUB_ACTIONS=true. Build itulah satu-satunya
// yang di-deploy ke GitHub Pages (lihat .github/workflows/deploy.yml), dan HANYA
// build itu yang butuh sub-path '/bunda-ami-atomy'.
//
// Semua build lain (Vercel, Netlify, domain sendiri, lokal) di-host di ROOT,
// jadi default-nya base '/'. Inilah perbaikan CSS/asset yang tidak ke-load di
// Vercel: dulu base masih '/bunda-ami-atomy' sehingga semua file dicari di
// path yang tidak ada (404).
const onGitHubPages = process.env.GITHUB_ACTIONS === 'true' && !isDev;

// Host produksi Vercel (tanpa protokol) untuk canonical & preview saat di-share.
const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export default defineConfig({
  site: onGitHubPages
    ? 'https://joshuasetiawann.github.io'
    : vercelHost
      ? `https://${vercelHost}`
      : 'https://joshuasetiawann.github.io',
  // HANYA GitHub Pages yang pakai sub-path; selain itu root '/'.
  base: onGitHubPages ? PROD_BASE : '/',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
