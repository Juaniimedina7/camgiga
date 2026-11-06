'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// Banners de marcas (webp optimizados en /public/product-banners).
// Para sumar/quitar uno, editá esta lista.
const BANNERS = [
  { src: '/product-banners/banner-eaton.webp', alt: 'Repuestos Eaton para camiones — CAMGIGA' },
  { src: '/product-banners/banner-eaton-collage.webp', alt: 'Línea de repuestos Eaton — CAMGIGA' },
  { src: '/product-banners/banner-zf.webp', alt: 'Repuestos ZF para camiones — CAMGIGA' },
  { src: '/product-banners/banner-dana.webp', alt: 'Repuestos Dana para camiones — CAMGIGA' },
  { src: '/product-banners/banner-spicer.webp', alt: 'Repuestos Spicer para camiones — CAMGIGA' },
  { src: '/product-banners/banner-meritor.webp', alt: 'Repuestos Meritor para camiones — CAMGIGA' },
  { src: '/product-banners/banner-euroricambi.webp', alt: 'Repuestos Euroricambi para camiones — CAMGIGA' },
  { src: '/product-banners/banner-maxgear.webp', alt: 'Repuestos Max Gear para camiones — CAMGIGA' },
]

const INTERVALO = 5000

export function ProductBanners() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const n = BANNERS.length
  const touchX = useRef<number | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  const go = useCallback((next: number) => setI((next + n) % n), [n])

  // Arranca el autoplay solo cuando el carrusel está a la vista (perf + evita
  // que, al cargar las imágenes lazy, un cambio off-screen muestre un flash).
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Autoplay: pausa en hover/foco, con pestaña oculta y si el SO pide menos movimiento.
  useEffect(() => {
    if (!visible || paused || n <= 1) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const t = setInterval(() => setI((p) => (p + 1) % n), INTERVALO)
    return () => clearInterval(t)
  }, [visible, paused, n])

  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <section className="section reveal" aria-label="Marcas que trabajamos">
      <div className="container">
        <div
          ref={rootRef}
          className="pbanner"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(i + 1)
            if (e.key === 'ArrowLeft') go(i - 1)
          }}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            if (touchX.current == null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1))
            touchX.current = null
          }}
          tabIndex={0}
          role="group"
          aria-roledescription="carrusel"
        >
          <div className="pbanner__viewport">
            {BANNERS.map((b, idx) => (
              <div
                key={b.src}
                className={`pbanner__slide${idx === i ? ' is-active' : ''}`}
                aria-hidden={idx !== i}
              >
                <img
                  className="pbanner__img"
                  src={b.src}
                  alt={b.alt}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  width={1920}
                  height={698}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="pbanner__arrow pbanner__arrow--prev"
            onClick={() => go(i - 1)}
            aria-label="Anterior"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            type="button"
            className="pbanner__arrow pbanner__arrow--next"
            onClick={() => go(i + 1)}
            aria-label="Siguiente"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          <div className="pbanner__dots" role="tablist" aria-label="Elegir banner">
            {BANNERS.map((b, idx) => (
              <button
                key={b.src}
                type="button"
                className={`pbanner__dot${idx === i ? ' is-on' : ''}`}
                onClick={() => go(idx)}
                aria-label={`Ir al banner ${idx + 1}`}
                aria-selected={idx === i}
                role="tab"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
