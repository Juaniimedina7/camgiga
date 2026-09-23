import { whatsappLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons'

// Botón flotante de WhatsApp (visible en toda la web, clave en mobile).
export function WhatsAppFab() {
  return (
    <a className="fab" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Consultar por WhatsApp">
      <WhatsAppIcon />
    </a>
  )
}
