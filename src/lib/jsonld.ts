import { CONTACTO } from './constants'

const BASE = 'https://www.camgiga.com.ar'

// Datos estructurados del negocio (schema.org). Se renderizan en todo el sitio
// para que Google entienda qué es CAMGIGA, dónde está y cómo contactarlo:
// clave para las búsquedas locales tipo "repuestos de camiones lanús".
export const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AutoPartsStore',
      '@id': `${BASE}/#business`,
      name: CONTACTO.nombre,
      alternateName: 'CAMGIGA Repuestos',
      description:
        'Repuestos para camiones, maquinaria agrícola y colectivos. Cajas de velocidades, diferenciales y embragues, originales y alternativos. Más de 25 años. Envíos a todo el país.',
      url: BASE,
      telephone: CONTACTO.telefonoTel,
      email: CONTACTO.email,
      logo: `${BASE}/logos/logo/camgiga_logo_transparente.png`,
      image: `${BASE}/logos/logo/camgiga_logo_transparente.png`,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Remedios de Escalada de San Martín 2055',
        addressLocality: 'Lanús Oeste',
        addressRegion: 'Buenos Aires',
        postalCode: '1824',
        addressCountry: 'AR',
      },
      areaServed: { '@type': 'Country', name: 'Argentina' },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '08:00',
          closes: '14:00',
        },
      ],
      sameAs: [`https://wa.me/${CONTACTO.whatsapp}`],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE}/#website`,
      url: BASE,
      name: CONTACTO.nombre,
      publisher: { '@id': `${BASE}/#business` },
      inLanguage: 'es-AR',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE}/catalogo?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}
