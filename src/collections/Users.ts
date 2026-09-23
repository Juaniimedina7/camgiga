import type { CollectionConfig } from 'payload'

// Usuarios del panel de administración (el cliente / equipo de CAMGIGA).
export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuario', plural: 'Usuarios' },
  admin: {
    useAsTitle: 'nombre',
    group: 'Administración',
  },
  auth: true,
  fields: [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
    },
  ],
  versions: false,
}
