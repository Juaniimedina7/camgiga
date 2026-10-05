import Link from 'next/link'
import type { Metadata } from 'next'
import { WhatsAppButton } from '../../../components/WhatsAppButton'
import { SmartImg } from '../../../components/SmartImg'
import { brandLogo } from '../../../lib/preview'
import { MARCAS_DESTACADAS } from '../../../lib/constants'

export const metadata: Metadata = {
  title: 'Nosotros — 25 años en repuestos para camiones',
  description:
    'CAMGIGA SRL, empresa argentina con más de 25 años en repuestos para camiones. Importación, exportación, primeras marcas y envíos a todo el país.',
}

export default function NosotrosPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Más de 25 años consiguiendo la pieza que otros no tienen.</h1>
          <p className="hero__sub">
            CAMGIGA SRL es una empresa argentina especializada en tren motriz para camiones,
            maquinaria agrícola y transporte de pasajeros.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container stack" style={{ maxWidth: 760 }}>
          <p>
            Desde hace más de 25 años importamos, exportamos y distribuimos repuestos originales y
            alternativos de las primeras marcas. Trabajamos para que los vehículos no paren.
          </p>
          <p>
            Somos especialistas en cajas de velocidades, diferenciales y embragues, y cubrimos una
            línea completa de repuestos para camiones y transporte. Amplio stock y envíos a todo el país.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="trust">
            <div className="trust__item"><span className="trust__ic">✓</span><div><b>Especialistas en tren motriz</b><br /><span className="muted">Cajas, diferenciales y embragues.</span></div></div>
            <div className="trust__item"><span className="trust__ic">✓</span><div><b>Stock amplio y permanente</b><br /><span className="muted">La pieza que nadie consiguió.</span></div></div>
            <div className="trust__item"><span className="trust__ic">✓</span><div><b>Importación y exportación</b><br /><span className="muted">Originales y alternativos.</span></div></div>
            <div className="trust__item"><span className="trust__ic">✓</span><div><b>Envíos a todo el país</b><br /><span className="muted">Estés donde estés.</span></div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">Marcas que trabajamos</h2>
          <div className="marquee" aria-label="Marcas que trabajamos">
            <div className="marquee__track">
              {[...MARCAS_DESTACADAS, ...MARCAS_DESTACADAS].map((m, i) => (
                <div key={i} className="logo-ph logo-ph--marquee" aria-hidden={i >= MARCAS_DESTACADAS.length}>
                  <SmartImg src={brandLogo(m)} alt={m} className="logo-img" fallback={<span>{m}</span>} />
                </div>
              ))}
            </div>
          </div>
          <div className="cta-block" style={{ marginTop: '2rem' }}>
            <h2>¿Buscás una pieza?</h2>
            <p>Escribinos y te ayudamos a encontrarla.</p>
            <div className="mt-2" style={{ display: 'inline-flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <WhatsAppButton lg />
              <Link className="btn btn--outline btn--lg" href="/catalogo" style={{ background: '#fff' }}>Ver catálogo</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
