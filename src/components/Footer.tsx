import Link from 'next/link'
import { CONTACTO } from '../lib/constants'
import { whatsappLink } from '../lib/whatsapp'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="footer__logo">CAM<span>GIGA</span></div>
          <p className="mt-1" style={{ maxWidth: '40ch' }}>
            Repuestos para camiones, maquinaria agrícola y transporte de pasajeros. Más de 25 años.
            Envíos a todo el país.
          </p>
        </div>

        <div>
          <h4>Catálogo</h4>
          <p><Link href="/catalogo">Ver todo</Link></p>
          <p><Link href="/categorias/cajas-de-velocidades">Cajas de velocidades</Link></p>
          <p><Link href="/categorias/diferenciales">Diferenciales</Link></p>
          <p><Link href="/categorias/embragues">Embragues</Link></p>
          <p><Link href="/nosotros">Nosotros</Link></p>
        </div>

        <div>
          <h4>Contacto</h4>
          <p><a href={`tel:${CONTACTO.telefonoTel}`}>{CONTACTO.telefono}</a></p>
          <p><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp {CONTACTO.whatsappMostrar}</a></p>
          <p><a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a></p>
          <p>{CONTACTO.direccion}</p>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} {CONTACTO.nombre}. Todos los derechos reservados.</span>
        <Link href="/privacidad">Política de privacidad</Link>
      </div>
    </footer>
  )
}
