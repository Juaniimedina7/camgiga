'use client'

import { useEffect, useState } from 'react'

export type HeroPhoto = { src: string; alt?: string }

// Carrusel de fotos con cross-fade automático (pausa con reduced-motion).
export function HeroCarousel({ images, interval = 3500, className = '' }: { images: HeroPhoto[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((x) => (x + 1) % images.length), interval)
    return () => clearInterval(t)
  }, [images.length, interval])
  return (
    <div className={`hcar ${className}`}>
      {images.map((im, idx) => (
        <img
          key={idx}
          src={im.src}
          alt={im.alt || ''}
          className={`hcar__img${idx === i ? ' is-on' : ''}`}
          loading={idx === 0 ? 'eager' : 'lazy'}
          aria-hidden={idx === i ? undefined : true}
        />
      ))}
      <div className="hcar__dots">
        {images.map((_, idx) => (
          <button key={idx} type="button" className={`hcar__dot${idx === i ? ' is-on' : ''}`} aria-label={`Foto ${idx + 1}`} onClick={() => setI(idx)} />
        ))}
      </div>
    </div>
  )
}

export const HERO_PHOTOS: HeroPhoto[] = [
  { src: '/products/cajasVelocidades.webp', alt: 'Caja de velocidades' },
  { src: '/products/diferencial.webp', alt: 'Diferencial' },
  { src: '/products/embrague.webp', alt: 'Embrague' },
  { src: '/products/radiador.webp', alt: 'Radiador' },
  { src: '/products/palier.webp', alt: 'Palier' },
]
