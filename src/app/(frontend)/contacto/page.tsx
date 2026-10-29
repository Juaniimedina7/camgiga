import type { Metadata } from 'next'
import { ContactForm } from '../../../components/ContactForm'
import { PageHero } from '../../../components/PageHero'
import { CONTACTO } from '../../../lib/constants'
import { whatsappLink } from '../../../lib/whatsapp'
import { PhoneIcon, WhatsAppIcon } from '../../../components/icons'

export const metadata: Metadata = {
  title: 'Contacto — Repuestos para camiones en Lanús',
  description:
    'Contactá a CAMGIGA en Lanús Oeste. WhatsApp, teléfono y email. Repuestos para camiones con envíos a todo el país.',
}

export default function ContactoPage() {
  return (
    <>
      <PageHero title={<>Estamos para ayudarte a encontrar tu <span className="mark">repuesto</span>.</>} sub="Escribinos por WhatsApp, llamanos o dejanos tu consulta. Te respondemos rápido." />
      <section className="section section--tight">
      <div className="container">
        <div className="contacto">
          <aside className="contacto__info">
            <div className="stack">
              <a className="btn btn--wa btn--block btn--lg" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="wa-ic" /> WhatsApp {CONTACTO.whatsappMostrar}
              </a>
              <a className="btn btn--outline btn--block" href={`tel:${CONTACTO.telefonoTel}`}>
                <PhoneIcon /> {CONTACTO.telefono}
              </a>
              <p><b>Email:</b> <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a></p>
              <p><b>Dirección:</b><br />{CONTACTO.direccion}</p>
              <p><b>Horarios:</b> Lunes a viernes de 8 a 17 hs · Sábados de 8 a 14 hs</p>
            </div>
          </aside>

          <div className="contacto__form">
            <ContactForm />
          </div>
        </div>

        <div className="contacto__map">
          <iframe
            title="Ubicación de CAMGIGA"
            src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACTO.direccion)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      </section>
    </>
  )
}
