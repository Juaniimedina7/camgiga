# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Usuario principal: **mecánicos, talleres, empresas de transporte/flotas y repuesteras del interior** que necesitan un repuesto específico para camión, maquinaria agrícola o colectivo. Suelen llegar desde el celular, muchas veces desde el taller, buscando por modelo de camión, por modelo de caja/diferencial, o por número de parte. Público técnico, práctico, no necesariamente cómodo con la computadora; valoran rapidez y confianza.

## Product Purpose

Sitio de CAMGIGA SRL, casa de repuestos para camiones con más de 25 años. Objetivo: que encontrar la pieza sea muy fácil y que la persona pase a **consultar** (WhatsApp principal, teléfono o formulario). No es e-commerce: no hay carrito, checkout ni precios. El éxito se mide en consultas iniciadas.

## Positioning

Su fuerte es el **tren motriz** (cajas de velocidades, diferenciales, embragues) — lo que más venden, sin presentarse como "especialistas" —, con amplio stock de primeras marcas, originales y alternativos, importación directa (no exportan) y envíos a todo el país. Gancho: "tienen la pieza que otros no consiguen". Base en Lanús Oeste, GBA.

## Operating Context

- Catálogo gestionado por el cliente (no técnico) desde un panel (Payload CMS en `/admin`).
- Conversión = consulta por WhatsApp con mensaje prearmado (nombre + código del producto), click-to-call al teléfono, o formulario que abre WhatsApp.
- Uso mayormente mobile, a veces con conexión de taller.

## Capabilities and Constraints

- **Sin precios online, siempre por consulta** (los precios cambian según proveedor/dólar). Confirmado que se mantiene así; no hay plan inmediato de e-commerce.
- ~57 productos cargados; cada uno con nombre, código/N° de parte, marca, categoría, aplicación (compatibilidad), estado original/alternativo, disponibilidad y fotos.
- Búsqueda y filtros por categoría, marca de repuesto, marca de camión y estado.
- Stack existente: Next.js (App Router) + Payload CMS + Postgres (Neon) + Vercel Blob, en Vercel. Páginas de navegación con ISR (cacheadas) para escalar.
- Subida de imágenes/video vía panel (Vercel Blob, clientUploads).

## Brand Commitments

- **Fijos (no cambiar):** nombre **CAMGIGA SRL**; datos de contacto — tel (011) 4228-2061, WhatsApp +54 9 11 6693-5999, email info@camgiga.com.ar, dirección Av. Remedios de Escalada de San Martín 2055, Lanús Oeste; **logos de marcas** (Eaton, Fuller, Spicer, Dana, Meritor, Rockwell, Sachs, ZF, Cinpal, Euroricambi, Maxgear); **fotos de productos/categorías** ya cargadas.
- **Abiertos a cambiar/mejorar:** eslogan (actual "la pieza que nadie consiguió"), mensajes/copy, paleta, tipografía y layout.
- Idioma: español rioplatense (voseo).

## Evidence on Hand

- Logos reales en `public/logos/` y fotos por categoría en `public/products/` (1200×900 WebP).
- 57 productos reales cargados en el CMS (Neon).
- Dominio en producción: camgiga.com.ar.
- No hay reseñas reales verificadas (las actuales en el sitio son de ejemplo); no fabricar métricas, reseñas ni certificaciones sin confirmación.

## Product Principles

- **Encontrar la pieza primero.** Buscar por camión / caja-dif / N° de parte tiene que ser lo más directo posible.
- **La consulta es el producto.** Todo empuja a WhatsApp/tel con el menor roce (mobile-first, botones cómodos).
- **Confianza por trayectoria y marcas.** 25 años, primeras marcas, stock y envíos sostienen la credibilidad.
- **Para público poco tecnológico.** Claridad, jerarquía fuerte, texto legible, nada de jerga.
- **Honestidad.** Sin precios inventados, sin reseñas/métricas falsas.

## Accessibility & Inclusion

Público con baja afinidad digital y uso mobile: jerarquía clara, tipografía legible, áreas táctiles cómodas (≥44–48px), contraste AA, foco visible y `prefers-reduced-motion` respetado.
