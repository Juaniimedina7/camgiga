'use client'

import { useState } from 'react'
import { CONTACTO } from '../lib/constants'
import { WhatsAppIcon } from './icons'

// El formulario arma un mensaje y abre WhatsApp (no persiste; así lo definimos).
export function ContactForm() {
  const [enviado, setEnviado] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const partes = [
      `Hola CAMGIGA, soy ${f.get('nombre') || ''}.`,
      f.get('codigo') ? `Código de pieza: ${f.get('codigo')}.` : '',
      f.get('consulta') ? `Consulta: ${f.get('consulta')}.` : '',
      f.get('localidad') ? `Localidad: ${f.get('localidad')}.` : '',
      f.get('telefono') ? `Tel: ${f.get('telefono')}.` : '',
      f.get('email') ? `Email: ${f.get('email')}.` : '',
    ].filter(Boolean)
    const url = `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(partes.join(' '))}`
    window.open(url, '_blank', 'noopener')
    setEnviado(true)
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div>
        <label htmlFor="c-nombre">Nombre</label>
        <input id="c-nombre" name="nombre" type="text" required autoComplete="name" />
      </div>
      <div>
        <label htmlFor="c-tel">Teléfono</label>
        <input id="c-tel" name="telefono" type="tel" inputMode="tel" autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" autoComplete="email" />
      </div>
      <div>
        <label htmlFor="c-loc">Localidad</label>
        <input id="c-loc" name="localidad" type="text" />
      </div>
      <div>
        <label htmlFor="c-cod">Código de pieza (opcional)</label>
        <input id="c-cod" name="codigo" type="text" />
      </div>
      <div>
        <label htmlFor="c-consulta">Tu consulta</label>
        <textarea id="c-consulta" name="consulta" required />
      </div>
      <button className="btn btn--wa btn--lg btn--block" type="submit">
        <WhatsAppIcon className="wa-ic" /> Enviar por WhatsApp
      </button>
      {enviado ? <p className="muted center">Se abrió WhatsApp con tu consulta. Si no, escribinos al {CONTACTO.whatsappMostrar}.</p> : null}
    </form>
  )
}
