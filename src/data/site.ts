/**
 * ════════════════════════════════════════════════════════════════════════
 *  DATA UTAMA SITUS  ·  Bunda Ami
 *  Edit nilai di bawah ini untuk mengubah identitas situs.
 *  Tidak perlu menyentuh file kode lain.
 * ════════════════════════════════════════════════════════════════════════
 */

export interface SiteConfig {
  /** Nama yang tampil besar di profil */
  name: string;
  /** Peran / titel singkat (mis. "Pendamping Produk & Member Atomy") */
  role: string;
  /** Bio singkat di kartu linktree */
  bio: string;
  /** Tampilkan badge centang biru di sebelah nama? */
  verified: boolean;
  /**
   * Foto profil. Taruh file di folder /public lalu tulis nama filenya,
   * contoh: 'img/bunda-ami.jpg'. Kosongkan ('') untuk memakai inisial.
   */
  avatar: string;
  /** Inisial cadangan bila foto belum ada */
  initials: string;
  /** Teks copyright di footer */
  copyright: string;
  /** Disclaimer resmi Atomy */
  disclaimer: string;
  /** Data untuk SEO & preview saat dibagikan */
  seo: {
    title: string;
    description: string;
    /** Gambar preview saat link dibagikan (taruh di /public) */
    ogImage: string;
    locale: string;
  };
}

export const site: SiteConfig = {
  name: 'Bunda Ami',
  role: 'Pendamping Produk & Member Atomy',
  bio: 'Menemani keluarga Indonesia hidup lebih sehat bersama Atomy — dari produk pilihan hingga peluang berkembang. Semua kanal resmi Bunda Ami ada di sini.',
  verified: true,

  // Ganti dengan foto asli, contoh: avatar: 'img/bunda-ami.jpg'
  avatar: '',
  initials: 'BA',

  copyright: '© 2026 Bunda Ami',
  disclaimer:
    'Informasi produk, harga, stok, dan registrasi mengikuti kanal resmi Atomy Indonesia.',

  seo: {
    title: 'Bunda Ami · Pendamping Produk & Member Atomy',
    description:
      'Semua kanal resmi Bunda Ami dalam satu halaman: konsultasi WhatsApp, Zoom sharing, Facebook, Instagram, TikTok, dan profil lengkap.',
    ogImage: 'og-image.svg',
    locale: 'id_ID',
  },
};
