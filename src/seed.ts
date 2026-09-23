import { getPayload } from 'payload'
import config from './payload.config'
import { slugify } from './lib/slugField'

// Carga inicial: categorías, marcas y algunos productos de ejemplo.
// Ejecutar con: npm run seed  (idempotente por slug)

const CATEGORIAS = [
  { nombre: 'Cajas de velocidades', descripcion: 'Cajas manuales, automáticas y de transferencia. Vendemos la caja completa y sus repuestos: carcazas, engranajes, sincronizados y ejes.', modelos: 'Eaton Fuller 4005, 4205, 4305, 4405, 5005, 5205, 6205, 6306 · Eaton Clark 2615 FS · Scania GR 801', orden: 10 },
  { nombre: 'Diferenciales', descripcion: 'Corona y piñón, satélites, planetarios, cruz y arandelas, porta coronas, palieres, campanas, rodamientos y retenes.', modelos: 'Rockwell/Meritor 230 y 240 · Dana Spicer (una y dos velocidades) · Gran Sasso', orden: 20 },
  { nombre: 'Embragues', descripcion: 'Disco simple y doble (orgánico y sinterizado) y kits completos de placa, disco y rodamiento.', modelos: 'Eaton y Sachs · 365, 395 y 430 mm', orden: 30 },
  { nombre: 'Palieres', orden: 40 },
  { nombre: 'Tanques de combustible', orden: 50 },
  { nombre: 'Carrocerías', orden: 60 },
  { nombre: 'Frenos', orden: 70 },
  { nombre: 'Turbocompresores', orden: 80 },
  { nombre: 'Filtros', orden: 90 },
  { nombre: 'Inyección electrónica', orden: 100 },
  { nombre: 'Radiadores', orden: 110 },
  { nombre: 'Bombas de agua', orden: 120 },
  { nombre: 'Electroventiladores', orden: 130 },
  { nombre: 'Escapes', orden: 140 },
  { nombre: 'Ópticas', orden: 150 },
  { nombre: 'Elásticos', orden: 160 },
  { nombre: 'Tapas de cilindro', orden: 170 },
]

const MARCAS = ['Eaton', 'Fuller', 'Spicer', 'Dana', 'Meritor', 'Rockwell', 'Sachs', 'ZF', 'Clark', 'Gran Sasso']

const PRODUCTOS = [
  { nombre: 'Caja de velocidades Eaton Fuller 4205', codigo: 'EF-4205', numeroParte: '4205', categoria: 'Cajas de velocidades', marca: 'Eaton', tipo: 'original', disponibilidad: 'en-stock', destacado: true, marcasCamion: ['Mercedes Benz', 'Ford', 'Volkswagen'], aplicacion: ['Mercedes Benz 1620 / 1634', 'Ford Cargo 1722 / 1730'], descripcion: 'Caja manual de 5 velocidades. Disponible completa o por repuestos.' },
  { nombre: 'Caja de velocidades Eaton Fuller 6306', codigo: 'EF-6306', numeroParte: '6306', categoria: 'Cajas de velocidades', marca: 'Eaton', tipo: 'original', disponibilidad: 'consultar', destacado: true, marcasCamion: ['Scania', 'Volvo'], aplicacion: ['Scania serie 3', 'Volvo NL'] },
  { nombre: 'Diferencial Meritor 240', codigo: 'MER-240', numeroParte: '240', categoria: 'Diferenciales', marca: 'Meritor', tipo: 'original', disponibilidad: 'en-stock', destacado: true, marcasCamion: ['Mercedes Benz', 'Iveco'], aplicacion: ['Mercedes Benz Atron', 'Iveco Tector'] },
  { nombre: 'Corona y piñón Dana Spicer', codigo: 'DS-CYP', categoria: 'Diferenciales', marca: 'Dana', tipo: 'alternativo', disponibilidad: 'consultar', marcasCamion: ['Ford', 'Volkswagen'], aplicacion: ['Ford 14000', 'VW Constellation'] },
  { nombre: 'Kit de embrague Sachs 430 mm', codigo: 'SA-430', numeroParte: '430', categoria: 'Embragues', marca: 'Sachs', tipo: 'original', disponibilidad: 'en-stock', destacado: true, marcasCamion: ['Mercedes Benz', 'Scania', 'Volvo'], aplicacion: ['Mercedes Benz 1620', 'Scania 113'], descripcion: 'Kit completo: placa, disco y rodamiento.' },
  { nombre: 'Embrague Eaton disco doble 395 mm', codigo: 'EA-395D', numeroParte: '395', categoria: 'Embragues', marca: 'Eaton', tipo: 'original', disponibilidad: 'consultar', marcasCamion: ['Iveco', 'Ford'], aplicacion: ['Iveco Stralis', 'Ford Cargo'] },
]

async function run() {
  const payload = await getPayload({ config })

  const catId: Record<string, number | string> = {}
  for (const c of CATEGORIAS) {
    const slug = slugify(c.nombre)
    const existing = await payload.find({ collection: 'categories', where: { slug: { equals: slug } }, limit: 1 })
    const doc = existing.docs[0]
      ? existing.docs[0]
      : await payload.create({ collection: 'categories', data: { ...c, slug, destacadaEnInicio: true } as any })
    catId[c.nombre] = doc.id
  }
  console.log(`Categorías: ${Object.keys(catId).length}`)

  const brandId: Record<string, number | string> = {}
  for (const nombre of MARCAS) {
    const slug = slugify(nombre)
    const existing = await payload.find({ collection: 'brands', where: { slug: { equals: slug } }, limit: 1 })
    const doc = existing.docs[0] ? existing.docs[0] : await payload.create({ collection: 'brands', data: { nombre, slug } as any })
    brandId[nombre] = doc.id
  }
  console.log(`Marcas: ${Object.keys(brandId).length}`)

  let creados = 0
  for (const p of PRODUCTOS) {
    const slug = slugify(p.nombre)
    const existing = await payload.find({ collection: 'products', where: { slug: { equals: slug } }, limit: 1 })
    if (existing.docs[0]) continue
    await payload.create({
      collection: 'products',
      data: {
        nombre: p.nombre,
        slug,
        codigo: p.codigo,
        numeroParte: (p as any).numeroParte,
        categoria: catId[p.categoria],
        marca: brandId[p.marca],
        tipo: p.tipo,
        disponibilidad: p.disponibilidad,
        destacado: (p as any).destacado ?? false,
        marcasCamion: p.marcasCamion,
        aplicacion: (p.aplicacion ?? []).map((modelo) => ({ modelo })),
        descripcion: (p as any).descripcion,
      } as any,
    })
    creados++
  }
  console.log(`Productos nuevos: ${creados}`)
  console.log('Seed listo.')
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
