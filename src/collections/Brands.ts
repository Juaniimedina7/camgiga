import type { CollectionConfig } from 'payload'
import { slugField } from '../lib/slugField'

export const Brands: CollectionConfig = {
  slug: 'brands',
  labels: { singular: 'Marca de repuesto', plural: 'Marcas de repuesto' },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'slug'],
    group: 'Catálogo',
  },
  access: { read: () => true },
  defaultSort: 'nombre',
  fields: [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
    },
    slugField('nombre'),
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
