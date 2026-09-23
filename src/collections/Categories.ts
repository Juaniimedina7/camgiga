import type { CollectionConfig } from 'payload'
import { slugField } from '../lib/slugField'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Categoría', plural: 'Categorías' },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'orden', 'slug'],
    group: 'Catálogo',
  },
  access: { read: () => true },
  defaultSort: 'orden',
  fields: [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
    },
    slugField('nombre'),
    {
      name: 'descripcion',
      label: 'Descripción (bajada de la categoría)',
      type: 'textarea',
      admin: { description: 'Aparece debajo del título en la página de la categoría.' },
    },
    {
      name: 'modelos',
      label: 'Modelos que cubrimos',
      type: 'textarea',
      admin: { description: 'Ej: Eaton Fuller 4205, 5205, 6306 · Scania GR 801' },
    },
    {
      name: 'imagen',
      label: 'Imagen',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'orden',
      label: 'Orden',
      type: 'number',
      defaultValue: 100,
      admin: { position: 'sidebar', description: 'Menor número aparece primero.' },
    },
    {
      name: 'destacadaEnInicio',
      label: 'Mostrar en Inicio',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
