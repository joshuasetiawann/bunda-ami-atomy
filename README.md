# Si Batu Kali Menjadi Berlian · Linktree + Landing Page

Website resmi **Si Batu Kali Menjadi Berlian** (Pendamping Produk & Member Atomy) yang terdiri dari dua halaman:

| Halaman | Alamat | Isi |
| --- | --- | --- |
| **Linktree** | `/` | Kartu tunggal: profil + kutipan bergantian + CTA WhatsApp + daftar tautan resmi |
| **Landing / Profil** | `/profil` | Cerita lengkap: siapa Bunda, visi & misi, pencapaian (di hero), kontribusi, perjalanan |

Dibangun dengan **[Astro](https://astro.build)** — cepat, ringan, dan mudah dirawat. Semua data dipisahkan dari kode, jadi mengubah isi **tidak perlu menyentuh tampilan**.

---

## ✏️ Cara mengganti isi (paling sering dipakai)

Semua yang biasa diubah ada di folder **`src/data/`**. Cukup edit file-nya, simpan, selesai.

| File | Untuk mengubah |
| --- | --- |
| [`src/data/site.ts`](src/data/site.ts) | Nama, peran, bio, foto profil, badge centang, teks SEO |
| [`src/data/links.ts`](src/data/links.ts) | Tombol-tombol di linktree (tambah / hapus / urutkan, isi link asli) |
| [`src/data/quotes.ts`](src/data/quotes.ts) | Kumpulan quotes motivasi |
| [`src/data/profile.ts`](src/data/profile.ts) | Seluruh isi landing page (tentang, visi-misi, pencapaian, dll) |

### Mengisi link asli

Buka [`src/data/links.ts`](src/data/links.ts), ganti bagian `href`. Contoh:

```ts
href: 'https://wa.me/628123456789',   // WhatsApp
href: 'https://instagram.com/bundaami',
```

### Mengganti foto profil

1. Taruh file foto di folder `public/`, misalnya `public/img/bunda-ami.jpg`
2. Buka [`src/data/site.ts`](src/data/site.ts), ubah:

```ts
avatar: 'img/bunda-ami.jpg',
```

Selama `avatar` masih kosong (`''`), tampil inisial **SB** secara otomatis.

### Gambar preview saat link dibagikan (opsional)

File `public/og-image.png` (1200×630) dipakai saat link dibagikan ke WhatsApp/Facebook. Untuk menggantinya, taruh PNG/JPG 1200×630 baru di `public/` lalu sesuaikan `seo.ogImage` di `site.ts`.

---

## 🚀 Menjalankan di komputer

Butuh [Node.js](https://nodejs.org) versi 18 ke atas.

```bash
npm install      # sekali saja, pasang kebutuhan
npm run dev      # buka http://localhost:4321
```

Perintah lain:

```bash
npm run build    # hasil siap-publish ada di folder dist/
npm run preview  # melihat hasil build
```

---

## 🌐 Cara publish (deploy)

### Pilihan A — GitHub Pages (otomatis, sudah disiapkan)

Sudah ada workflow di `.github/workflows/deploy.yml` yang **mengaktifkan GitHub
Pages secara otomatis**. Cukup `git push` ke `main`, dan situs akan ter-publish ke
`https://joshuasetiawann.github.io/bunda-ami-atomy/`.

> Jika auto-enable gagal (karena pembatasan akun), aktifkan manual sekali saja:
> **Settings → Pages → Source: GitHub Actions**, lalu jalankan ulang workflow.

### Pilihan B — Netlify / Vercel

Hubungkan repo, set **build command** `npm run build` dan **publish directory** `dist`.
Tidak perlu mengubah apa pun: `base` otomatis `'/'` di semua build kecuali GitHub Actions
(lihat [`astro.config.mjs`](astro.config.mjs) — `PROD_BASE` hanya dipakai GitHub Pages).

---

## 🗂️ Struktur folder

```
src/
├─ data/            ← ISI WEBSITE (edit di sini)
├─ components/
│  ├─ linktree/     komponen halaman linktree
│  ├─ landing/      komponen halaman profil
│  └─ Icon.astro    kumpulan ikon
├─ layouts/         kerangka halaman (SEO, font, dll)
├─ pages/           index.astro (linktree) & profil.astro (landing)
├─ styles/          global.css (warna, font, gaya umum)
└─ utils/           bantu alamat link
public/             gambar, favicon, og-image
```

## 🎨 Catatan desain

- Palet **merah membara** dengan aksen hangat **ember-oranye** (dipakai hemat).
- Tipografi **Fraunces** (judul) + **Plus Jakarta Sans** (isi).
- Animasi lembut & menghormati pengaturan *reduce motion* perangkat.
