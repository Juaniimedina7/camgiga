// Imágenes de PREVIEW (temporales) para ver cómo queda el layout.
// Se reemplazan por fotos reales cargadas en el CMS.

function lock(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 1000
  return h
}

// Fotos de preview reproducibles (picsum). Se muestran en gris para que
// se vean cohesivas/industriales hasta cargar las fotos reales.
export function categoryPreview(slug?: string | null): string {
  return `https://picsum.photos/seed/cam-${slug || lock('x')}/640/480`
}

export function productPreview(seed: string): string {
  return `https://picsum.photos/seed/camp-${lock(seed)}/600/600`
}

// Foto real de camión en ruta (Unsplash) para el hero.
export function heroPreview(): string {
  return 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&q=70'
}

// Logos locales (public/logos). Fallback a Clearbit para marcas sin archivo.
const BRAND_LOGO: Record<string, string> = {
  Eaton: '/logos/eaton.png',
  Fuller: '/logos/fuller.png',
  Spicer: '/logos/spicer.png',
  Dana: '/logos/dana.png',
  Meritor: '/logos/meritor.png',
  Rockwell: '/logos/rockwell.png',
  Sachs: '/logos/sachs.png',
  ZF: '/logos/zf.png',
  Cinpal: '/logos/cinpal.png',
  Euroricambi: '/logos/euroricambi.png',
  Maxgear: '/logos/maxgear.png',
}

const BRAND_DOMAIN: Record<string, string> = {
  INA: 'schaeffler.com',
}

export function brandLogo(name: string): string {
  if (BRAND_LOGO[name]) return BRAND_LOGO[name]
  const d = BRAND_DOMAIN[name]
  return d ? `https://logo.clearbit.com/${d}?size=120` : ''
}
