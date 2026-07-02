/**
 * ════════════════════════════════════════════════════════════════════════
 *  DATA UTAMA SITUS  ·  Si Batu Kali Menjadi Berlian
 *  Edit nilai di bawah ini untuk mengubah identitas situs.
 *  Tidak perlu menyentuh file kode lain.
 * ════════════════════════════════════════════════════════════════════════
 */

export interface SiteConfig {
  /** Nama yang tampil besar di profil */
  name: string;
  /** Peran / titel singkat (mis. "Pendamping Produk & Member Atomy") */
  role: string;
  /**
   * Bio singkat. Di desain saat ini tidak tampil di kartu linktree
   * (kartu memakai kutipan bergantian); disimpan sebagai cadangan teks.
   */
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
  name: 'Si Batu Kali Menjadi Berlian',
  role: 'Pendamping Produk & Member Atomy',
  bio: 'Menemani keluarga Indonesia hidup lebih sehat bersama Atomy — dari produk pilihan hingga peluang berkembang. Semua kanal resmi Si Batu Kali Menjadi Berlian ada di sini.',
  verified: true,

  // Ganti dengan foto asli, contoh: avatar: 'img/bunda-ami.jpg'
  avatar: '',
  initials: 'SB',

  copyright: '© 2026 Si Batu Kali Menjadi Berlian',
  disclaimer:
    'Informasi produk, harga, stok, dan registrasi mengikuti kanal resmi Atomy Indonesia.',

  seo: {
    title: 'Si Batu Kali Menjadi Berlian · Pendamping Produk & Member Atomy',
    description:
      'Semua kanal resmi Si Batu Kali Menjadi Berlian dalam satu halaman: konsultasi WhatsApp, Zoom sharing, Facebook, Instagram, TikTok, dan profil lengkap.',
    ogImage: 'og-image.png',
    locale: 'id_ID',
  },
};
