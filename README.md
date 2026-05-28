# Bunda Ami · Linktree + Landing Page

Website resmi **Bunda Ami** (Pendamping Produk & Member Atomy) yang terdiri dari dua halaman:

| Halaman | Alamat | Isi |
| --- | --- | --- |
| **Linktree** | `/` | Kartu profil + tautan resmi + quotes motivasi yang berganti otomatis |
| **Landing / Profil** | `/profil` | Cerita lengkap: siapa Bunda Ami, visi & misi, pencapaian, kontribusi, perjalanan |

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

Selama `avatar` masih kosong (`''`), tampil inisial **BA** secara otomatis.

### Gambar preview saat link dibagikan (opsional)

File `public/og-image.svg` dipakai saat link dibagikan ke WhatsApp/Facebook. Untuk hasil terbaik di semua platform, ganti dengan gambar **PNG/JPG ukuran 1200×630** lalu sesuaikan `seo.ogImage` di `site.ts`.

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

Sudah ada workflow di `.github/workflows/deploy.yml`. Aktifkan sekali saja:

1. GitHub → **Settings → Pages**
2. **Source** → pilih **GitHub Actions**
3. Setiap `git push` ke `main` akan otomatis ter-publish ke
   `https://joshuasetiawann.github.io/bunda-ami-atomy/`

### Pilihan B — Netlify / Vercel

Hubungkan repo, set **build command** `npm run build` dan **publish directory** `dist`.
Jika memakai domain sendiri (root), ubah `base` di [`astro.config.mjs`](astro.config.mjs) menjadi `'/'`.

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

- Palet **biru-putih premium** dengan aksen hangat **champagne-gold** (dipakai hemat).
- Tipografi **Fraunces** (judul) + **Plus Jakarta Sans** (isi).
- Animasi lembut & menghormati pengaturan *reduce motion* perangkat.
