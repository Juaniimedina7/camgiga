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

export const DISPONIBILIDAD_OPTIONS = [
  { label: 'En stock', value: 'en-stock' },
  { label: 'Consultar disponibilidad', value: 'consultar' },
  { label: 'Sin stock', value: 'sin-stock' },
] as const

export const TIPO_OPTIONS = [
  { label: 'Original', value: 'original' },
  { label: 'Alternativo', value: 'alternativo' },
] as const
