import type { Field } from 'payload'

// Convierte "Caja Eaton Fuller 4205" -> "caja-eaton-fuller-4205"
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // saca acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

// Campo slug que se autocompleta desde `sourceField` si queda vacío.
export function slugField(sourceField = 'nombre'): Field {
  return {
    name: 'slug',
    type: 'text',
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description: 'Se genera solo. Editalo solo si sabés lo que hacés (afecta la URL).',
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          if (value) return slugify(value)
          const source = data?.[sourceField]
          return source ? slugify(source) : value
        },
      ],
    },
  }
}
