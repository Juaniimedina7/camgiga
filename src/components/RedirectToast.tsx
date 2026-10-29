'use client'

import { useEffect, useState } from 'react'

// Muestra un aviso breve cuando el usuario toca un botón de WhatsApp,
// para que el salto a otra app no se sienta "mudo" (feedback de conversión).
export function RedirectToast() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a')
      if (a instanceof HTMLAnchorElement && a.href.includes('wa.me')) {
        setShow(true)
        clearTimeout(t)
        t = setTimeout(() => setShow(false), 3000)
      }
    }
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
      clearTimeout(t)
    }
  }, [])

  return (
    <div className={`redirect-toast${show ? ' is-on' : ''}`} role="status" aria-live="polite">
      Te estamos redirigiendo a WhatsApp…
    </div>
  )
}
