import type { Metadata } from 'next'
import { ContactForm } from '../../../components/ContactForm'
import { CONTACTO } from '../../../lib/constants'
import { whatsappLink } from '../../../lib/whatsapp'
import { PhoneIcon, WhatsAppIcon } from '../../../components/icons'

export const metadata: Metadata = {
  title: 'Contacto — Repuestos para camiones en Lanús',
  description:
    'Contactá a CAMGIGA en Lanús Oeste. WhatsApp, teléfono y email. Repuestos para camiones con envíos a todo el país.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoPartsStore',
  name: CONTACTO.nombre,
  telephone: CONTACTO.telefonoTel,
  email: CONTACTO.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Remedios de Escalada de San Martín 2055',
    addressLocality: 'Lanús Oeste',
    addressRegion: 'Buenos Aires',
    addressCountry: 'AR',
  },
  areaServed: 'AR',
  url: 'https://www.camgiga.com.ar',
}

export default function ContactoPage() {
  return (
    <section className="section">
      <div className="container">
        <h1>Estamos para ayudarte a encontrar tu repuesto.</h1>
        <p className="lead mb-2">Escribinos por WhatsApp, llamanos o dejanos tu consulta. Te respondemos rápido.</p>

        <div className="catalog">
          <div style={{ order: 2 }}>
            <ContactForm />
          </div>

          <aside style={{ order: 1 }}>
            <div className="stack">
              <a className="btn btn--wa btn--block btn--lg" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="wa-ic" /> WhatsApp {CONTACTO.whatsappMostrar}
              </a>
              <a className="btn btn--outline btn--block" href={`tel:${CONTACTO.telefonoTel}`}>
                <PhoneIcon /> {CONTACTO.telefono}
              </a>
              <p><b>Email:</b> <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a></p>
              <p><b>Dirección:</b><br />{CONTACTO.direccion}</p>
              <p><b>Horarios:</b> a confirmar</p>
              <div style={{ aspectRatio: '16/9', background: 'var(--surface-alt)', borderRadius: 'var(--radius)', display: 'grid', placeItems: 'center', color: 'var(--muted)', border: '1px solid var(--line)' }}>
                Mapa (placeholder)
              </div>
            </div>
          </aside>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  )
}
