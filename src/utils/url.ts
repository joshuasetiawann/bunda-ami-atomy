/**
 * Gabungkan path internal dengan BASE_URL website (lihat astro.config.mjs).
 * Pakai ini untuk SEMUA link internal & file di /public agar tetap benar
 * baik saat di-host di root domain maupun di subfolder GitHub Pages.
 *
 *   withBase('/profil')        -> '/bunda-ami-atomy/profil'
 *   withBase('img/foto.jpg')   -> '/bunda-ami-atomy/img/foto.jpg'
 */
export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL || '/';
  const trimmedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const trimmedPath = path.startsWith('/') ? path : `/${path}`;
  return `${trimmedBase}${trimmedPath}` || '/';
}
