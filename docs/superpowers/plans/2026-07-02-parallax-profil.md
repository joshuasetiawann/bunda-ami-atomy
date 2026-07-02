# Parallax & Animasi Kisah Halaman Profil — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Halaman `/profil` mendapat parallax (hero + ornamen latar "orbs" di 3 section) dan timeline Kisah yang hidup: garis menggambar diri mengikuti scroll, titik menyala per item, milestone masuk bergantian kiri/kanan.

**Architecture:** Satu komponen script (`ScrollMotion.astro`, rAF-throttled, listener pasif) menggerakkan semua elemen `[data-plx]` dan menulis `--tl-progress` ke `.timeline`. Ornamen latar berupa komponen `Orbs.astro` reusable (murni dekoratif, `aria-hidden`). Semua efek adalah progressive enhancement di atas pola reveal yang sudah ada: tanpa JS atau dengan `prefers-reduced-motion`, seluruh konten tampil statis lengkap.

**Tech Stack:** Astro 5 (static), vanilla JS, CSS. **Tanpa dependency baru.**

**Spec:** `docs/superpowers/specs/2026-07-02-parallax-profil-design.md`

## Global Constraints

- Tidak menambah dependency npm apa pun.
- Animasi hanya `transform` + `opacity`; scroll listener `{ passive: true }`; satu rAF loop.
- `prefers-reduced-motion` dan no-JS ⇒ konten statis lengkap (garis penuh, titik menyala, tanpa parallax); tidak ada konten yang tersembunyi.
- Halaman linktree `/` tidak berubah sama sekali (`dist/index.html` bebas `data-plx`).
- Komentar kode & copy berbahasa Indonesia (konvensi proyek).
- Tidak menyentuh `src/data/*.ts` maupun `ISIAN-BUNDA.md`.
- Verifikasi per task = `npm run build` + asersi `grep` pada `dist/` (tidak ada framework test di proyek ini; menambahkannya untuk efek visual = YAGNI). Cek visual manual dilakukan di Task 4.
- Setiap task diakhiri commit **dan push** (permintaan tetap user: push per task).

---

### Task 1: Fondasi motion — `ScrollMotion.astro`, `Orbs.astro`, parallax Hero

**Files:**
- Create: `src/components/landing/ScrollMotion.astro`
- Create: `src/components/landing/Orbs.astro`
- Modify: `src/styles/global.css` (tambah blok orbs sebelum blok "Hormati preferensi reduce motion")
- Modify: `src/components/landing/Hero.astro`
- Modify: `src/pages/profil.astro`

**Interfaces:**
- Consumes: pola `html.js` + reveal yang sudah ada di `BaseLayout.astro`.
- Produces:
  - Atribut `data-plx="<number>"` — elemen apa pun dengan atribut ini digerakkan ScrollMotion. Kecepatan: positif = tampak lebih lambat dari scroll (kedalaman), negatif = arah berlawanan. Elemen diukur dari `parentElement`-nya (parent TIDAK boleh ikut di-transform).
  - CSS custom property `--tl-progress` (0–1) yang ditulis ke elemen `.timeline` (dipakai Task 2).
  - Komponen `<Orbs variant="hero" | "quotes" | "cta" />` (dipakai Task 3). Section pemakai WAJIB `position: relative; z-index: 0;` (orbs pakai `z-index: -1`).

- [ ] **Step 1: Buat `src/components/landing/ScrollMotion.astro`**

```astro
<!--
  Motor animasi scroll halaman profil: parallax [data-plx] + progress .timeline.
  Murni enhancement — tidak jalan bila prefers-reduced-motion aktif.
-->
<script>
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const layers = Array.from(document.querySelectorAll('[data-plx]')).map((el) => ({
    el,
    speed: parseFloat(el.getAttribute('data-plx') || '0') || 0,
  }));
  const timeline = document.querySelector('.timeline');

  if (!reduce && (layers.length > 0 || timeline)) {
    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const { el, speed } of layers) {
        // Ukur dari parent (tak ikut ter-transform) agar bebas feedback-loop.
        const host = el.parentElement || el;
        const r = host.getBoundingClientRect();
        const offset = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
      }
      if (timeline) {
        // Progress: sejauh mana garis 60% viewport telah melewati timeline.
        const r = timeline.getBoundingClientRect();
        const raw = (vh * 0.6 - r.top) / r.height;
        timeline.style.setProperty(
          '--tl-progress',
          Math.min(1, Math.max(0, raw)).toFixed(4)
        );
      }
    };

    const queue = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue, { passive: true });
    update();
  }
</script>
```

- [ ] **Step 2: Buat `src/components/landing/Orbs.astro`**

```astro
---
// Ornamen latar dekoratif: bola cahaya lembut ber-parallax.
// Section pemakai wajib: position: relative; z-index: 0;
interface Props {
  /** varian posisi supaya tiap section tidak identik */
  variant?: 'hero' | 'quotes' | 'cta';
}
const { variant = 'hero' } = Astro.props;
---

<div class:list={['orbs', `orbs-${variant}`]} aria-hidden="true">
  <span class="orb orb-a" data-plx="0.22"></span>
  <span class="orb orb-b" data-plx="-0.16"></span>
  <span class="orb orb-c" data-plx="0.1"></span>
</div>
```

(Style ada di `global.css` — Step 3 — karena dipakai lintas section, meneruskan pola utilitas `.reveal`.)

- [ ] **Step 3: Tambah blok orbs di `src/styles/global.css`**

Sisipkan TEPAT SEBELUM komentar `/* ── Hormati preferensi reduce motion ── */`:

```css
/* ── Orbs: ornamen latar parallax (dekoratif) ──
   Section pemakai wajib position: relative; z-index: 0;
   orbs memakai z-index -1 agar selalu di belakang konten. */
.orbs {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}

.orb {
  position: absolute;
  border-radius: 50%;
  will-change: transform;
}

/* Visual bola di ::before agar animasi float tidak bentrok dengan
   transform parallax inline yang dipasang ScrollMotion pada .orb. */
.orb::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  filter: blur(42px);
  animation: orb-float 12s ease-in-out infinite alternate;
}

.orb-a {
  width: 320px;
  height: 320px;
  top: -70px;
  left: -90px;
}

.orb-a::before {
  background: radial-gradient(circle, rgba(225, 29, 42, 0.16), transparent 70%);
}

.orb-b {
  width: 260px;
  height: 260px;
  right: -70px;
  bottom: -50px;
}

.orb-b::before {
  background: radial-gradient(circle, rgba(255, 122, 24, 0.15), transparent 70%);
  animation-delay: -4s;
  animation-duration: 14s;
}

.orb-c {
  width: 210px;
  height: 210px;
  top: 36%;
  right: 16%;
}

.orb-c::before {
  background: radial-gradient(circle, rgba(255, 90, 50, 0.13), transparent 70%);
  animation-delay: -8s;
  animation-duration: 16s;
}

/* Varian posisi per section */
.orbs-quotes .orb-a {
  top: auto;
  bottom: -90px;
  left: -110px;
}

.orbs-quotes .orb-c {
  top: -50px;
  right: 12%;
}

.orbs-cta .orb-a {
  width: 380px;
  height: 380px;
  top: -130px;
  left: -70px;
}

.orbs-cta .orb-c {
  top: auto;
  bottom: -60px;
  right: 24%;
}

@keyframes orb-float {
  from {
    transform: translate3d(0, -14px, 0) scale(1);
  }
  to {
    transform: translate3d(0, 16px, 0) scale(1.06);
  }
}
```

(Float otomatis mati saat reduce-motion karena aturan global `animation-duration: 0.001ms` yang sudah ada.)

- [ ] **Step 4: Pasang orbs + drift di `src/components/landing/Hero.astro`**

4a. Tambah import di frontmatter (setelah `import Icon from '../Icon.astro';`):

```astro
import Orbs from './Orbs.astro';
```

4b. Ubah pembuka section dan `.hero-in` (baris `<section class="hero">` s/d `<div class="hero-in">`) menjadi:

```astro
<section class="hero">
  <Orbs variant="hero" />
  <div class="hero-in" data-plx="0.06">
```

4c. Di `<style>`, ubah rule `.hero` menjadi (tambah 2 properti):

```css
.hero {
  position: relative;
  z-index: 0;
  padding: clamp(44px, 8vw, 96px) 0 clamp(52px, 9vw, 104px);
}
```

(`data-plx="0.06"` = drift halus; maksimum ±~55 px saat hero keluar viewport, masih tertampung padding bawah hero sehingga tidak menabrak section berikutnya.)

- [ ] **Step 5: Pasang ScrollMotion di `src/pages/profil.astro`**

5a. Tambah import (setelah `import Footer ...`):

```astro
import ScrollMotion from '../components/landing/ScrollMotion.astro';
```

5b. Tambah `<ScrollMotion />` setelah `<Footer />`:

```astro
  <Footer />
  <ScrollMotion />
</BaseLayout>
```

- [ ] **Step 6: Build + asersi**

Run: `npm run build`
Expected: `[build] Complete!` tanpa error.

Run: `grep -c 'data-plx' dist/profil/index.html`
Expected: `4` (1 hero-in + 3 orb)

Run: `grep -c 'data-plx' dist/index.html || echo LINKTREE-BERSIH`
Expected: `0` lalu `LINKTREE-BERSIH` (linktree tak tersentuh)

- [ ] **Step 7: Commit + push**

```bash
git add src/components/landing/ScrollMotion.astro src/components/landing/Orbs.astro src/styles/global.css src/components/landing/Hero.astro src/pages/profil.astro
git commit -m "feat: parallax hero + fondasi orbs & scroll-motion di halaman profil

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
git push origin main
```

---

### Task 2: Animasi timeline Kisah (`Cerita.astro`)

**Files:**
- Modify: `src/components/landing/Cerita.astro` (hanya blok `<style>`; markup tidak berubah)

**Interfaces:**
- Consumes: `--tl-progress` (0–1) yang ditulis ScrollMotion (Task 1) ke `.timeline`; class `is-visible` yang ditambahkan observer reveal di `BaseLayout.astro`; class `html.js`.
- Produces: tidak ada (konsumen terakhir).

- [ ] **Step 1: Ubah `<style>` di `Cerita.astro`**

1a. Ubah rule `.story` (tambah `overflow: hidden` — mencegah slide horizontal item memicu scrollbar-x di layar sempit):

```css
.story {
  background: var(--mist);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  overflow: hidden;
}
```

1b. Ubah `.timeline::before` jadi garis track statis samar, lalu tambah `.timeline::after` sebagai garis progress:

```css
.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 8px;
  bottom: 8px;
  width: 1.5px;
  background: rgba(71, 6, 6, 0.12);
}

/* Garis progress: memanjang mengikuti scroll via --tl-progress (ScrollMotion) */
.timeline::after {
  content: '';
  position: absolute;
  left: 7px;
  top: 8px;
  bottom: 8px;
  width: 1.5px;
  background: linear-gradient(180deg, var(--azure), var(--sky), var(--gold-soft));
  transform-origin: top;
  transform: scaleY(var(--tl-progress, 0));
}

/* Tanpa JS / reduce motion: garis langsung penuh */
:global(html:not(.js)) .timeline::after {
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .timeline::after {
    transform: none;
  }
}
```

1c. Ganti rule `.tl-dot` dan `.tl-item.last .tl-dot` dengan versi menyala/padam:

```css
/* Default = menyala (juga jadi fallback tanpa JS) */
.tl-dot {
  position: absolute;
  left: -32px;
  top: 3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--azure);
  border: 3px solid var(--azure);
  box-shadow: 0 0 0 5px rgba(225, 29, 42, 0.12);
  transition: background 0.45s ease, box-shadow 0.45s ease,
    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tl-item.last .tl-dot {
  border-color: var(--gold-soft);
}

/* Padam sebelum item ter-reveal (hanya saat JS aktif) */
:global(.js) .tl-item:not(.is-visible) .tl-dot {
  background: var(--paper);
  box-shadow: none;
  transform: scale(0.6);
}
```

1d. Tambah di akhir `<style>` — item masuk bergantian kiri/kanan (menimpa transform `.reveal` global; stagger `transition-delay` inline yang ada tetap berlaku):

```css
:global(.js) .tl-item.reveal {
  transform: translate3d(-30px, 14px, 0);
}

:global(.js) .tl-item.reveal:nth-child(even) {
  transform: translate3d(30px, 14px, 0);
}

/* WAJIB paling akhir: menang atas kedua rule di atas saat sudah tampil */
:global(.js) .tl-item.reveal.is-visible {
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  :global(.js) .tl-item.reveal {
    opacity: 1;
    transform: none;
  }
}
```

- [ ] **Step 2: Build + asersi**

Run: `npm run build`
Expected: `[build] Complete!` tanpa error.

Run: `grep -rl 'tl-progress' dist/ | head -3`
Expected: minimal 1 file (CSS ter-bundle memuat `--tl-progress`).

- [ ] **Step 3: Commit + push**

```bash
git add src/components/landing/Cerita.astro
git commit -m "feat: timeline kisah hidup — garis progress scroll, titik menyala, item bergantian

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
git push origin main
```

---

### Task 3: Orbs di QuotesSection & ContactCTA

**Files:**
- Modify: `src/components/landing/QuotesSection.astro`
- Modify: `src/components/landing/ContactCTA.astro`

**Interfaces:**
- Consumes: `<Orbs variant="quotes" />`, `<Orbs variant="cta" />` dari Task 1 (host wajib `position: relative; z-index: 0;`).

- [ ] **Step 1: `QuotesSection.astro`**

1a. Tambah import di frontmatter (setelah `import Icon ...`):

```astro
import Orbs from './Orbs.astro';
```

1b. Tambah orbs sebagai anak pertama section:

```astro
<section class="quotes">
  <Orbs variant="quotes" />
  <div class="quotes-in">
```

1c. Ubah rule `.quotes` di `<style>`:

```css
.quotes {
  position: relative;
  z-index: 0;
  padding: clamp(60px, 11vw, 120px) 0;
}
```

- [ ] **Step 2: `ContactCTA.astro`**

2a. Tambah import di frontmatter (setelah `import Icon ...`):

```astro
import Orbs from './Orbs.astro';
```

2b. Tambah orbs sebagai anak pertama panel (sebelum `.cta-bar`):

```astro
<div class="cta-panel reveal">
  <Orbs variant="cta" />
  <div class="brand-bar cta-bar" aria-hidden="true"></div>
```

2c. Ubah rule `.cta-panel` di `<style>` (tambah `z-index: 0` — sudah `position: relative`):

```css
.cta-panel {
  position: relative;
  z-index: 0;
  text-align: center;
  padding: clamp(48px, 8vw, 88px) clamp(24px, 5vw, 56px);
  border-radius: 32px;
  background: linear-gradient(160deg, #fff, var(--mist-2));
  border: 1px solid rgba(225, 29, 42, 0.14);
  overflow: hidden;
}
```

- [ ] **Step 3: Build + asersi**

Run: `npm run build`
Expected: `[build] Complete!` tanpa error.

Run: `grep -o 'orbs orbs-[a-z]*' dist/profil/index.html | sort | uniq -c`
Expected: tiga baris — `orbs orbs-cta`, `orbs orbs-hero`, `orbs orbs-quotes` (masing-masing 1).

Run: `grep -c 'data-plx' dist/profil/index.html`
Expected: `10` (1 hero-in + 3×3 orb)

- [ ] **Step 4: Commit + push**

```bash
git add src/components/landing/QuotesSection.astro src/components/landing/ContactCTA.astro
git commit -m "feat: ornamen orbs parallax di section kutipan & CTA

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
git push origin main
```

---

### Task 4: Verifikasi visual end-to-end

**Files:** tidak ada (verifikasi; perbaikan kecil bila ditemukan → commit terpisah).

- [ ] **Step 1: Jalankan dev server & cek visual `/profil`**

Run: `npm run dev` (atau `npm run preview` setelah build)
Cek di browser (viewport desktop & ~390 px mobile):
1. Hero: orbs mengambang pelan; saat scroll, konten hero & orbs bergerak dengan kecepatan berbeda (kedalaman).
2. Kisah: garis timeline memanjang mengikuti scroll; titik menyala + pop saat item muncul; item masuk bergantian kiri (ganjil) / kanan (genap).
3. Kutipan & CTA: orbs lembut di latar, teks tetap kontras & terbaca.
4. Tidak ada scrollbar horizontal di viewport sempit.

- [ ] **Step 2: Cek `prefers-reduced-motion`**

Emulasi via DevTools (Rendering → prefers-reduced-motion: reduce), muat ulang `/profil`:
Expected: tanpa parallax, garis timeline penuh, semua titik menyala, semua konten tampil.

- [ ] **Step 3: Cek linktree `/` tidak berubah**

Expected: tampilan kartu linktree persis seperti sebelum perubahan; `dist/index.html` bebas `data-plx` / `orbs`.

- [ ] **Step 4: Bila ada perbaikan, commit + push**

```bash
git add -A && git commit -m "fix: penyetelan hasil verifikasi visual parallax

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && git push origin main
```
