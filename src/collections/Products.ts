import type { CollectionConfig } from 'payload'
import { slugField } from '../lib/slugField'
import { DISPONIBILIDAD_OPTIONS, MARCAS_CAMION_OPTIONS, TIPO_OPTIONS } from '../lib/constants'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Producto', plural: 'Productos' },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'codigo', 'categoria', 'marca', 'disponibilidad'],
    group: 'Catálogo',
    listSearchableFields: ['nombre', 'codigo', 'numeroParte'],
  },
  access: { read: () => true },
  defaultSort: 'nombre',
  fields: [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
      admin: { description: 'Ej: Caja de velocidades Eaton Fuller 4205' },
    },
    slugField('nombre'),
    {
      type: 'row',
      fields: [
        {
          name: 'codigo',
          label: 'Código',
          type: 'text',
          admin: { width: '50%', description: 'Código interno o de parte visible.' },
        },
        {
          name: 'numeroParte',
          label: 'Número de parte',
          type: 'text',
          admin: { width: '50%', description: 'Para que lo encuentren buscando por N° de parte.' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'categoria',
          label: 'Categoría',
          type: 'relationship',
          relationTo: 'categories',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'marca',
          label: 'Marca de repuesto',
          type: 'relationship',
          relationTo: 'brands',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'tipo',
          label: 'Estado',
          type: 'select',
          options: [...TIPO_OPTIONS],
          defaultValue: 'original',
          admin: { width: '50%' },
        },
        {
          name: 'disponibilidad',
          label: 'Disponibilidad',
          type: 'select',
          options: [...DISPONIBILIDAD_OPTIONS],
          defaultValue: 'consultar',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'marcasCamion',
      label: 'Marcas de camión compatibles',
      type: 'select',
      hasMany: true,
      options: [...MARCAS_CAMION_OPTIONS],
    },
    {
      name: 'aplicacion',
      label: 'Compatible con (modelos)',
      type: 'array',
      labels: { singular: 'Modelo', plural: 'Modelos' },
      admin: { description: 'Ej: Mercedes Benz 1620 / 1634. Un renglón por modelo.' },
      fields: [{ name: 'modelo', type: 'text', required: true }],
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'textarea',
    },
    {
      name: 'imagenes',
      label: 'Fotos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'despiece',
      label: 'Imagen de despiece (opcional)',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'relacionados',
      label: 'Productos relacionados',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: { description: 'Se muestran en la ficha como "También te puede servir".' },
    },
    {
      name: 'destacado',
      label: 'Destacado en Inicio',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
}
