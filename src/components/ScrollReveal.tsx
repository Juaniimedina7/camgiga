'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Reveal al hacer scroll, a prueba de fallos:
// - Sin JS o con reduced-motion, el contenido se ve normal (no se oculta).
// - Con JS, oculta los .reveal y los muestra al entrar en viewport.
export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const html = document.documentElement
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    html.classList.add('reveal-on')

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )

    // Esperar al paint de la ruta actual antes de observar.
    const id = requestAnimationFrame(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el))
    })

    return () => {
      cancelAnimationFrame(id)
      io.disconnect()
    }
  }, [pathname])

  return null
}
