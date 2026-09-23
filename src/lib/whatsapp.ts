import { CONTACTO } from './constants'

// Arma el link de WhatsApp con un mensaje ya escrito.
// Genérico (header / FAB) o con datos del producto (ficha / card).
export function whatsappLink(opts?: { nombre?: string; codigo?: string; mensaje?: string }): string {
  let texto: string
  if (opts?.mensaje) {
    texto = opts.mensaje
  } else if (opts?.nombre) {
    const cod = opts.codigo ? ` (Cód: ${opts.codigo})` : ''
    texto = `Hola CAMGIGA, quiero consultar por: ${opts.nombre}${cod}. ¿Tienen disponibilidad y envío?`
  } else {
    texto = 'Hola CAMGIGA, quería hacer una consulta.'
  }
  return `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(texto)}`
}
