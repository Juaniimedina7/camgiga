import type { Media } from '../payload-types'

type Ref = number | string | Media | null | undefined

// Devuelve la URL de una imagen (elige un tamaño generado si existe).
export function mediaUrl(ref: Ref, size?: 'thumbnail' | 'card' | 'full'): string | null {
  if (!ref || typeof ref !== 'object') return null
  if (size && ref.sizes && ref.sizes[size]?.url) return ref.sizes[size]!.url!
  return ref.url ?? null
}

export function mediaAlt(ref: Ref, fallback = ''): string {
  if (ref && typeof ref === 'object' && ref.alt) return ref.alt
  return fallback
}
