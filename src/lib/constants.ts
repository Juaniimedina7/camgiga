// Datos de contacto y constantes de dominio de CAMGIGA.
// Un solo lugar para editar: se usa en el CMS, en el frontend y en los links.

export const CONTACTO = {
  nombre: 'CAMGIGA SRL',
  telefono: '(011) 4228-2061',
  telefonoTel: '+541142282061', // para tel:
  whatsapp: '5491166935999', // para wa.me (sin + ni espacios)
  whatsappMostrar: '+54 9 11 6693-5999',
  email: 'info@camgiga.com.ar',
  direccion: 'Av. Remedios de Escalada de San Martín 2055, Lanús Oeste, Buenos Aires',
  localidad: 'Lanús Oeste, Buenos Aires, Argentina',
} as const

// Marcas de camión que atienden (filtro y campo del producto).
export const MARCAS_CAMION = [
  'Mercedes Benz',
  'Ford',
  'Volkswagen',
  'Iveco',
  'Scania',
  'Volvo',
  'Fiat',
  'Agrale',
  'GM / Chevrolet',
] as const

export const MARCAS_CAMION_OPTIONS = MARCAS_CAMION.map((m) => ({ label: m, value: m }))

// Marcas de repuesto que trabajan (tira de marcas en Inicio / Nosotros).
export const MARCAS_REPUESTO = [
  'Eaton', 'Fuller', 'Spicer', 'Dana', 'Meritor', 'Rockwell',
  'Sachs', 'ZF', 'INA', 'Clark', 'Gran Sasso', 'Bepo', 'Cinpal', 'Tifec',
] as const

// Marcas que se muestran con logo en el muro (Inicio y Nosotros usan la misma lista).
export const MARCAS_DESTACADAS = [
  'Eaton', 'Fuller', 'Spicer', 'Dana', 'Meritor', 'Rockwell',
  'Sachs', 'ZF', 'Cinpal', 'Euroricambi', 'Maxgear',
] as const

// Categorías de respaldo para el Inicio (hasta que se carguen en el CMS).
export const CATEGORIAS_FALLBACK = [
  { nombre: 'Cajas de velocidades', slug: 'cajas-de-velocidades' },
  { nombre: 'Diferenciales', slug: 'diferenciales' },
  { nombre: 'Embragues', slug: 'embragues' },
  { nombre: 'Palieres', slug: 'palieres' },
  { nombre: 'Frenos', slug: 'frenos' },
  { nombre: 'Tanques de combustible', slug: 'tanques-de-combustible' },
] as const

// Reseñas (placeholder — reemplazar por reales / link a Google cuando estén).
export const RESENIAS = [
  { autor: 'Hernán Gómez', empresa: 'Taller Gómez · San Justo', texto: 'Conseguí una caja Eaton que no encontraba en ningún lado. Me la mandaron al interior en dos días. Un lujo.' },
  { autor: 'Transporte El Rayo', empresa: 'Flota · Córdoba', texto: 'Les compramos repuestos de diferencial para toda la flota. Siempre tienen stock y responden al toque por WhatsApp.' },
  { autor: 'Marcelo Ríos', empresa: 'Mecánico · Lanús', texto: 'Precios acomodados y te asesoran bien. Si no tienen la pieza, te la consiguen. Hace años que les compro.' },
  { autor: 'Repuestera del Sur', empresa: 'Casa de repuestos · La Plata', texto: 'Proveedores de confianza. Originales y alternativos, lo que necesites. Cumplen con los tiempos de entrega.' },
] as const

export const RESENIAS_RATING = { puntaje: 4.8, cantidad: 126 } as const

export const DISPONIBILIDAD_OPTIONS = [
  { label: 'En stock', value: 'en-stock' },
  { label: 'Consultar disponibilidad', value: 'consultar' },
  { label: 'Sin stock', value: 'sin-stock' },
] as const

export const TIPO_OPTIONS = [
  { label: 'Original', value: 'original' },
  { label: 'Alternativo', value: 'alternativo' },
] as const
