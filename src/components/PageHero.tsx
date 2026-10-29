import type { ReactNode } from 'react'

// Encabezado editorial para páginas internas (mismo lenguaje que el hero V3).
export function PageHero({ title, sub }: { title: ReactNode; sub?: ReactNode }) {
  return (
    <section className="pagehero">
      <div className="container">
        <h1 className="pagehero__title">{title}</h1>
        {sub ? <p className="pagehero__sub">{sub}</p> : null}
      </div>
    </section>
  )
}
