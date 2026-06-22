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

// Deteksi build di Vercel. Vercel selalu meng-host situs di ROOT domain
// (mis. namaproyek.vercel.app/), JADI base HARUS '/'. Kalau tetap pakai
// '/bunda-ami-atomy', semua CSS/asset/link akan 404 dan halaman tampil polos.
const isVercel = !!process.env.VERCEL;

// URL produksi Vercel (tanpa protokol) untuk canonical & preview saat di-share.
const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export default defineConfig({
  // Vercel pakai domain-nya sendiri; selain itu tetap GitHub Pages.
  site:
    isVercel && vercelHost
      ? `https://${vercelHost}`
      : 'https://joshuasetiawann.github.io',
  // GitHub Pages butuh sub-path '/bunda-ami-atomy'; Vercel & dev pakai root '/'.
  base: isDev || isVercel ? '/' : PROD_BASE,
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
