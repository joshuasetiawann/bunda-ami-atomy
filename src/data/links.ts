/**
 * ════════════════════════════════════════════════════════════════════════
 *  DAFTAR TOMBOL LINKTREE
 *  Tambah / hapus / urutkan tombol cukup di array `links` ini.
 *
 *  Cara pakai:
 *  - href      : tempel link asli (mis. https://wa.me/62812xxxx).
 *                Untuk halaman dalam situs ini, set internal: true & href: '/profil'.
 *  - icon      : pilih dari daftar di src/components/Icon.astro
 *                (whatsapp, instagram, tiktok, facebook, zoom, globe, ...)
 *  - featured  : true = tombol besar menonjol (taruh yang terpenting di atas)
 *  - accent    : warna aksen ikon (boleh kode hex apa saja)
 * ════════════════════════════════════════════════════════════════════════
 */

export interface LinkItem {
  id: string;
  title: string;
  desc: string;
  href: string;
  icon: string;
  accent: string;
  featured?: boolean;
  /** true bila href adalah halaman di dalam situs ini (mis. '/profil') */
  internal?: boolean;
}

export const links: LinkItem[] = [
  {
    id: 'whatsapp',
    title: 'Konsultasi Si Batu Kali Menjadi Berlian',
    desc: 'Tanya produk, belanja, atau daftar member — dibalas langsung',
    href: '#ganti-link-whatsapp', // contoh: https://wa.me/628123456789
    icon: 'whatsapp',
    accent: '#25D366',
    featured: true,
  },
  {
    id: 'profil',
    title: 'Profil Lengkap Si Batu Kali Menjadi Berlian',
    desc: 'Kenali sosok, visi, perjalanan & kontribusi Si Batu Kali Menjadi Berlian',
    href: '/profil',
    icon: 'globe',
    accent: '#E11D2A',
    featured: true,
    internal: true,
  },
  {
    id: 'zoom',
    title: 'Zoom Sharing Atomy',
    desc: 'Masuk ke sesi sharing & edukasi online',
    href: '#ganti-link-zoom', // contoh: https://us02web.zoom.us/j/xxxx
    icon: 'zoom',
    accent: '#2D8CFF',
  },
  {
    id: 'facebook',
    title: 'Facebook',
    desc: 'Cerita, update, dan informasi Si Batu Kali Menjadi Berlian',
    href: '#ganti-link-facebook', // contoh: https://facebook.com/namaakun
    icon: 'facebook',
    accent: '#1877F2',
  },
  {
    id: 'instagram',
    title: 'Instagram',
    desc: 'Konten singkat, tips, dan aktivitas harian',
    href: 'https://www.instagram.com/sibatukalimenjadiberlian',
    icon: 'instagram',
    accent: '#E1306C',
  },
  {
    id: 'tiktok',
    title: 'TikTok',
    desc: 'Video ringan seputar Atomy dan keluarga',
    href: 'https://www.tiktok.com/@sibatukalimenjadiberlian',
    icon: 'tiktok',
    accent: '#111111',
  },
  {
    id: 'tiktok-2',
    title: 'TikTok (akun kedua)',
    desc: 'Akun TikTok cadangan Si Batu Kali Menjadi Berlian',
    href: 'https://www.tiktok.com/@sibatukalijadiberlian',
    icon: 'tiktok',
    accent: '#111111',
  },
];
