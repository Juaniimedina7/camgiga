import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Imagen', plural: 'Imágenes' },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      label: 'Texto alternativo (describe la imagen)',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // Miniaturas para el panel y tamaños responsive para el sitio.
    imageSizes: [
      { name: 'thumbnail', width: 320, height: 320, position: 'centre' },
      { name: 'card', width: 640, height: 640, position: 'centre' },
      { name: 'full', width: 1200, height: 1200, position: 'centre' },
    ],
    mimeTypes: ['image/*'],
  },
}
