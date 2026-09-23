import { whatsappLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons'

type Props = {
  nombre?: string
  codigo?: string
  mensaje?: string
  block?: boolean
  lg?: boolean
  children?: React.ReactNode
}

export function WhatsAppButton({ nombre, codigo, mensaje, block, lg, children }: Props) {
  const href = whatsappLink({ nombre, codigo, mensaje })
  return (
    <a
      className={`btn btn--wa${block ? ' btn--block' : ''}${lg ? ' btn--lg' : ''}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon className="wa-ic" />
      {children ?? 'Consultar por WhatsApp'}
    </a>
  )
}
