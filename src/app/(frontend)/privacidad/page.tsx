import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Política de privacidad de CAMGIGA SRL.',
}

export default function PrivacidadPage() {
  return (
    <section className="section">
      <div className="container stack" style={{ maxWidth: 760 }}>
        <h1>Política de privacidad</h1>
        <p className="muted">Placeholder — reemplazar por el texto legal definitivo del cliente.</p>
        <p>
          En CAMGIGA SRL respetamos tu privacidad. Los datos que nos dejás por el formulario de
          contacto o por WhatsApp se usan únicamente para responder tu consulta y no se comparten con
          terceros.
        </p>
        <p>
          Para ejercer tus derechos sobre tus datos o hacer una consulta, escribinos a
          info@camgiga.com.ar.
        </p>
      </div>
    </section>
  )
}
