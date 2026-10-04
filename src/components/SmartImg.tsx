'use client'

import { useState, type ReactNode } from 'react'

// <img> con fallback: si no hay src o falla la carga, muestra `fallback`.
// Evita íconos de imagen rota con las URLs de preview hotlinkeadas.
export function SmartImg({
  src,
  alt,
  className,
  fallback = null,
}: {
  src?: string | null
  alt: string
  className?: string
  fallback?: ReactNode
}) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return <>{fallback}</>
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />
}
