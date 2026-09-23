import Link from 'next/link'
import { whatsappLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons'

const NAV = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/#categorias', label: 'Categorías' },
  { href: '/#marcas', label: 'Marcas' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

export function Header() {
  const wa = whatsappLink()
  return (
    <header className="header">
      <div className="container">
        <div className="header__bar">
          <Link href="/" className="header__logo">CAM<span>GIGA</span></Link>

          <nav className="header__nav">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}>{n.label}</Link>
            ))}
          </nav>

          <div className="header__actions">
            <a className="btn btn--wa" href={wa} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="wa-ic" />
              <span className="header__wa-label">WhatsApp</span>
            </a>

            {/* Menú mobile sin JS */}
            <details className="menu">
              <summary className="header__menu-btn" aria-label="Abrir menú">☰</summary>
              <nav className="mobile-nav-panel">
                {NAV.map((n) => (
                  <Link key={n.href} href={n.href}>{n.label}</Link>
                ))}
              </nav>
            </details>
          </div>
        </div>
      </div>
    </header>
  )
}
