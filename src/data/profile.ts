/**
 * ════════════════════════════════════════════════════════════════════════
 *  ISI LANDING PAGE  ·  /profil
 *  Semua teks di bawah ini adalah CONTOH (placeholder) yang aman dipakai.
 *  Silakan ganti dengan cerita & data asli Si Batu Kali Menjadi Berlian kapan saja.
 *  Struktur (judul section) tidak perlu diubah — cukup isi teksnya.
 * ════════════════════════════════════════════════════════════════════════
 */

export interface Stat {
  value: string;
  label: string;
  desc: string;
}

export interface Card {
  icon: string;
  title: string;
  desc: string;
}

export interface Milestone {
  /** Boleh tahun ('2015') atau penanda babak ('Awal Perjalanan') */
  marker: string;
  title: string;
  desc: string;
}

export const profile = {
  /** ── HERO ──────────────────────────────────────────────────────────── */
  hero: {
    eyebrow: 'Pendamping Produk & Member Atomy',
    title: 'Mengenal Si Batu Kali Menjadi Berlian',
    tagline: 'Hidup sehat dan berdaya adalah hak setiap keluarga.',
    intro:
      'Selama lebih dari sepuluh tahun, beliau menemani keluarga Indonesia menemukan produk kesehatan terbaik sekaligus peluang untuk tumbuh. Halaman ini menceritakan siapa beliau, apa yang diperjuangkan, dan jejak yang ditinggalkan.',
  },

  /** ── TENTANG / SIAPA BUNDA AMI ─────────────────────────────────────── */
  about: {
    eyebrow: 'Siapa Si Batu Kali Menjadi Berlian',
    title: 'Sosok di balik sebuah nama yang dipercaya',
    paragraphs: [
      'Si Batu Kali Menjadi Berlian adalah seorang ibu sekaligus pendamping produk yang memulai perjalanannya dari keinginan sederhana: membuat keluarganya hidup lebih sehat. Dari dapur dan ruang keluarga, kebiasaan baik itu menular ke tetangga, sahabat, lalu ke ratusan keluarga lain.',
      'Bersama Atomy, beliau menemukan cara untuk menggabungkan dua hal yang dicintainya — merawat kesehatan keluarga dan memberdayakan sesama ibu untuk berdaya secara ekonomi.',
    ],
    /** Catatan redup di akhir paragraf (hapus bila kisah asli sudah diisi) */
    note: '(Ganti paragraf ini dengan kisah asli Si Batu Kali Menjadi Berlian.)',
    values: [
      'Tulus mendampingi, bukan sekadar menjual',
      'Mengutamakan kualitas dan kejujuran',
      'Percaya pada pertumbuhan bersama',
    ],
  },

  /** ── VISI & MISI ───────────────────────────────────────────────────── */
  visiMisi: {
    eyebrow: 'Arah & Tujuan',
    visiTitle: 'Visi',
    visi: 'Mewujudkan keluarga Indonesia yang sehat, sejahtera, dan berdaya — satu rumah pada satu waktu.',
    misiTitle: 'Misi',
    misi: [
      'Mengenalkan produk kesehatan berkualitas dengan harga yang adil.',
      'Mendampingi setiap keluarga memahami pola hidup sehat secara konsisten.',
      'Memberdayakan ibu dan keluarga untuk berkembang lewat peluang yang jujur.',
      'Membangun komunitas yang saling menguatkan dan tumbuh bersama.',
    ],
  },

  /** ── PENCAPAIAN ────────────────────────────────────────────────────── */
  pencapaian: {
    eyebrow: 'Jejak Perjalanan',
    title: 'Pencapaian yang lahir dari ketulusan',
    note: 'Angka di bawah ini adalah contoh. Silakan sesuaikan dengan pencapaian asli Si Batu Kali Menjadi Berlian.',
    stats: [
      { value: '10+', label: 'Tahun', desc: 'mendampingi keluarga hidup sehat' },
      { value: '500+', label: 'Keluarga', desc: 'terbantu menemukan pola sehat' },
      { value: '50+', label: 'Mitra', desc: 'bertumbuh bersama dalam tim' },
      { value: '4.9/5', label: 'Kepuasan', desc: 'rata-rata dari testimoni member' },
    ] as Stat[],
  },

  /** ── APA YANG BUNDA PUNYA / TAWARKAN ───────────────────────────────── */
  offerings: {
    eyebrow: 'Apa yang Ditawarkan',
    title: 'Lebih dari produk — sebuah pendampingan',
    items: [
      {
        icon: 'leaf',
        title: 'Produk Kesehatan Pilihan',
        desc: 'Rangkaian produk Atomy untuk kesehatan dan perawatan keluarga, dipilih dengan standar kualitas tinggi.',
      },
      {
        icon: 'users',
        title: 'Komunitas & Pendampingan',
        desc: 'Ruang untuk bertanya, berbagi, dan saling menyemangati — Si Batu Kali Menjadi Berlian mendampingi langkah demi langkah.',
      },
      {
        icon: 'video',
        title: 'Kelas & Sharing Online',
        desc: 'Sesi Zoom rutin seputar kesehatan, gaya hidup, dan peluang, terbuka untuk siapa saja.',
      },
      {
        icon: 'sparkle',
        title: 'Peluang Berkembang',
        desc: 'Kesempatan menambah penghasilan secara jujur sambil membantu lebih banyak keluarga.',
      },
    ] as Card[],
  },

  /** ── KONTRIBUSI DI MASYARAKAT ──────────────────────────────────────── */
  kontribusi: {
    eyebrow: 'Untuk Sekitar',
    title: 'Kontribusi yang melampaui penjualan',
    intro: 'Sukses sejati diukur dari seberapa banyak orang yang ikut terangkat.',
    items: [
      {
        icon: 'heart',
        title: 'Edukasi Kesehatan Keluarga',
        desc: 'Membagikan ilmu pola hidup sehat secara gratis lewat kelas dan media sosial.',
      },
      {
        icon: 'hand',
        title: 'Pemberdayaan Ibu Rumah Tangga',
        desc: 'Membuka jalan bagi para ibu untuk berdaya secara ekonomi dari rumah.',
      },
      {
        icon: 'sun',
        title: 'Kegiatan Sosial',
        desc: 'Terlibat dalam kegiatan berbagi dan kepedulian di lingkungan sekitar.',
      },
    ] as Card[],
  },

  /** ── CERITA / PERJALANAN BUNDA ─────────────────────────────────────── */
  cerita: {
    eyebrow: 'Cerita Bunda',
    title: 'Perjalanan, babak demi babak',
    note: 'Ini kerangka cerita. Isi setiap babak dengan kisah asli Si Batu Kali Menjadi Berlian.',
    milestones: [
      {
        marker: 'Awal Mula',
        title: 'Berawal dari rumah sendiri',
        desc: 'Niat sederhana untuk membuat keluarga lebih sehat menjadi titik awal segalanya.',
      },
      {
        marker: 'Titik Balik',
        title: 'Bertemu Atomy',
        desc: 'Menemukan produk dan filosofi yang sejalan dengan nilai yang dipegang selama ini.',
      },
      {
        marker: 'Bertumbuh',
        title: 'Komunitas mulai terbentuk',
        desc: 'Satu per satu keluarga ikut merasakan manfaat, lalu tumbuh menjadi tim yang solid.',
      },
      {
        marker: 'Hari Ini',
        title: 'Terus mendampingi',
        desc: 'Konsisten menemani lebih banyak keluarga menuju hidup yang sehat dan berdaya.',
      },
    ] as Milestone[],
  },
};
