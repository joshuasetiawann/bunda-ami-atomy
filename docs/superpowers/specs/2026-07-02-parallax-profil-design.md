# Parallax & Animasi Kisah — Halaman Profil

**Tanggal:** 2026-07-02 · **Status:** disetujui sebagian (gaya parallax dipilih user; animasi Kisah memakai opsi rekomendasi karena user AFK — mudah disetel ulang)

## Tujuan

Halaman `/profil` terasa lebih hidup dan interaktif:

1. **Parallax** pada Hero + ornamen latar lembut di beberapa section (pilihan user).
2. **Animasi Kisah**: garis timeline "menggambar diri" mengikuti scroll, titik menyala
   satu per satu, milestone masuk bergantian dari kiri/kanan (opsi rekomendasi).

Halaman linktree (`/`) tidak disentuh.

## Pendekatan yang dipilih

**Vanilla JS + CSS, tanpa dependency baru** — konsisten dengan pola yang sudah ada
(reveal via IntersectionObserver di `BaseLayout.astro`).

Alternatif yang ditolak:

- *CSS scroll-driven animations* (`animation-timeline`): dukungan browser belum merata,
  terutama in-app browser WhatsApp/Instagram yang banyak dipakai audiens Bunda.
- *GSAP ScrollTrigger*: +60 KB dependency untuk situs yang saat ini 0 library animasi;
  overkill untuk cakupan ini.

## Arsitektur

### 1. `src/components/landing/ScrollMotion.astro` (baru — script saja)

Dipasang sekali di `profil.astro`. Satu scroll-listener pasif + rAF-throttle yang:

- **Parallax:** untuk tiap elemen `[data-plx]`, hitung offset elemen relatif terhadap
  tengah viewport, terapkan `transform: translate3d(0, offset × speed, 0)`.
  `speed` dibaca dari nilai atribut (mis. `data-plx="0.18"`, negatif = arah berlawanan).
- **Progress timeline:** hitung sejauh mana garis 60% viewport telah melewati elemen
  `.timeline`, tulis ke CSS custom property `--tl-progress` (0–1) pada elemen itu.
- **Guard:** berhenti total bila `prefers-reduced-motion` aktif (tidak memasang listener).

### 2. `src/components/landing/Orbs.astro` (baru — ornamen latar)

Komponen dekoratif reusable: 2–3 "bola cahaya" radial-gradient warna brand
(merah/bara/ember, opacity rendah, blur), `aria-hidden`, `pointer-events: none`,
di belakang konten (`z-index`), masing-masing dengan `data-plx` berbeda + animasi
idle mengambang pelan (CSS keyframes) supaya hidup bahkan sebelum scroll.
Dipakai di: **Hero**, **QuotesSection**, **ContactCTA**. Section pemakai diberi
`position: relative; overflow: hidden`.

### 3. `Hero.astro`

- Tambah `<Orbs />` di latar.
- Konten hero diberi drift halus (`data-plx` kecil ≈ 0.08–0.12) sehingga terasa
  berlapis saat mulai scroll — bukan efek dramatis, hanya kedalaman.

### 4. `Cerita.astro`

- **Garis track** (yang ada sekarang, `::before`) dipudarkan jadi garis statis samar.
- **Garis progress** baru di atasnya: gradient brand, `transform-origin: top`,
  `transform: scaleY(var(--tl-progress, 0))` — memanjang mengikuti scroll.
- **Titik menyala:** memakai class `is-visible` yang SUDAH ditambahkan observer reveal —
  saat item ter-reveal, `.tl-dot` berubah terisi warna azure + glow + pop
  (scale 0.4→1, easing spring).
- **Masuk bergantian:** item ganjil slide dari kiri (−28 px), genap dari kanan (+28 px),
  tetap memakai stagger `transition-delay` yang sudah ada.

### 5. `src/styles/global.css`

- Style orbs + keyframes float (global karena dipakai ≥3 section).
- Arah slide bergantian ditulis di style scoped `Cerita.astro` via
  `nth-child(odd/even)` pada `.tl-item` — tanpa perubahan markup, tanpa class baru.
- Fallback: `html:not(.js)` dan `prefers-reduced-motion` ⇒ garis progress penuh
  (`scaleY(1)`), titik semua menyala, orbs statis, tanpa parallax. Tidak ada konten
  yang hilang tanpa JS (meneruskan pola yang ada).

## Performa & aksesibilitas

- Hanya `transform` + `opacity` (tanpa layout/paint besar); `will-change: transform`
  terbatas pada orbs; listener `{ passive: true }`; satu rAF loop untuk semuanya.
- `prefers-reduced-motion` dihormati penuh (sudah ada aturan globalnya, script ikut cek).
- Orbs `aria-hidden="true"`; kontras teks tak terpengaruh (opacity orbs rendah,
  di belakang konten).

## Pengujian

1. `npm run build` lulus.
2. Cek visual via dev server: parallax hero, orbs, garis timeline memanjang saat scroll,
   titik menyala, item masuk kiri/kanan bergantian.
3. Emulasi `prefers-reduced-motion` ⇒ semua konten tampil statis lengkap.
4. Halaman linktree `/` tidak berubah.

## Di luar cakupan

- Parallax di halaman linktree.
- Perubahan konten/copy atau `ISIAN-BUNDA.md` (tidak ada perubahan data).
