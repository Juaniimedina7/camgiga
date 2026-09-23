import Link from 'next/link'
import type { Metadata } from 'next'
import { getBrands, getCategories, getProducts } from '../../../lib/data'
import { ProductCard } from '../../../components/ProductCard'
import { WhatsAppButton } from '../../../components/WhatsAppButton'
import { MARCAS_CAMION, TIPO_OPTIONS } from '../../../lib/constants'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Catálogo de repuestos para camiones',
  description:
    'Buscá entre nuestros repuestos para camiones: cajas, diferenciales, embragues, frenos y más. Originales y alternativos. Consultá por WhatsApp.',
}

type SP = { [k: string]: string | string[] | undefined }
const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || ''

export default async function CatalogPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams
  const q = str(sp.q)
  const categoria = str(sp.categoria)
  const marca = str(sp.marca)
  const camion = str(sp.camion)
  const tipo = str(sp.tipo)
  const page = Math.max(1, parseInt(str(sp.page) || '1', 10) || 1)

  const [categories, brands, result] = await Promise.all([
    getCategories().catch(() => []),
    getBrands().catch(() => []),
    getProducts({ q, categoria, marca, camion, tipo, page, limit: 24 }).catch(() => null),
  ])

  const docs = result?.docs ?? []
  const total = result?.totalDocs ?? 0

  // Chips de filtros activos (con link para quitarlos)
  const chips: { label: string; param: string }[] = []
  if (categoria) chips.push({ label: categories.find((c) => c.slug === categoria)?.nombre || categoria, param: 'categoria' })
  if (marca) chips.push({ label: brands.find((b) => b.slug === marca)?.nombre || marca, param: 'marca' })
  if (camion) chips.push({ label: camion, param: 'camion' })
  if (tipo) chips.push({ label: tipo === 'original' ? 'Original' : 'Alternativo', param: 'tipo' })

  const buildUrl = (omit?: string, extra?: Record<string, string>) => {
    const p = new URLSearchParams()
    const base: Record<string, string> = { q, categoria, marca, camion, tipo, ...extra }
    for (const [k, v] of Object.entries(base)) {
      if (v && k !== omit) p.set(k, v)
    }
    const qs = p.toString()
    return `/catalogo${qs ? `?${qs}` : ''}`
  }

  return (
    <section className="section">
      <div className="container">
        <h1>Catálogo de repuestos</h1>
        <p className="lead mb-2">Filtrá por categoría, marca o modelo de camión. Consultá cualquier pieza por WhatsApp.</p>

        <div className="catalog">
          {/* FILTROS */}
          <form className="filters" action="/catalogo" method="get">
            <div className="filters__group">
              <label className="filters__label" htmlFor="f-q">Buscar</label>
              <input id="f-q" type="text" name="q" defaultValue={q} placeholder="Producto, código o N° parte" />
            </div>
            <div className="filters__group">
              <label className="filters__label" htmlFor="f-cat">Categoría</label>
              <select id="f-cat" name="categoria" defaultValue={categoria}>
                <option value="">Todas</option>
                {categories.map((c) => <option key={c.id} value={c.slug || ''}>{c.nombre}</option>)}
              </select>
            </div>
            <div className="filters__group">
              <label className="filters__label" htmlFor="f-marca">Marca de repuesto</label>
              <select id="f-marca" name="marca" defaultValue={marca}>
                <option value="">Todas</option>
                {brands.map((b) => <option key={b.id} value={b.slug || ''}>{b.nombre}</option>)}
              </select>
            </div>
            <div className="filters__group">
              <label className="filters__label" htmlFor="f-camion">Marca de camión</label>
              <select id="f-camion" name="camion" defaultValue={camion}>
                <option value="">Todas</option>
                {MARCAS_CAMION.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="filters__group">
              <label className="filters__label" htmlFor="f-tipo">Estado</label>
              <select id="f-tipo" name="tipo" defaultValue={tipo}>
                <option value="">Original y alternativo</option>
                {TIPO_OPTIONS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <button className="btn btn--primary btn--block" type="submit">Aplicar filtros</button>
            {chips.length ? <Link className="btn btn--ghost btn--block mt-1" href="/catalogo">Limpiar</Link> : null}
          </form>

          {/* RESULTADOS */}
          <div>
            {chips.length ? (
              <div className="active-chips">
                {chips.map((ch) => (
                  <Link key={ch.param} href={buildUrl(ch.param)} aria-label={`Quitar filtro ${ch.label}`}>
                    {ch.label} <span aria-hidden="true">✕</span>
                  </Link>
                ))}
              </div>
            ) : null}

            <p className="count mb-2">{total} {total === 1 ? 'producto' : 'productos'}{q ? ` para “${q}”` : ''}</p>

            {docs.length ? (
              <>
                <div className="grid grid--products">
                  {docs.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
                {/* Paginación */}
                {(result?.totalPages ?? 1) > 1 ? (
                  <div className="row-between mt-2">
                    {result?.hasPrevPage ? <Link className="btn btn--outline" href={buildUrl(undefined, { page: String(page - 1) })}>← Anteriores</Link> : <span />}
                    <span className="count">Página {page} de {result?.totalPages}</span>
                    {result?.hasNextPage ? <Link className="btn btn--outline" href={buildUrl(undefined, { page: String(page + 1) })}>Siguientes →</Link> : <span />}
                  </div>
                ) : null}
              </>
            ) : (
              <div className="stack">
                <p><b>No encontramos esa pieza.</b> Probá con menos filtros o escribinos y la buscamos.</p>
                <WhatsAppButton mensaje={`Hola CAMGIGA, busco: ${q || 'un repuesto'} y no lo encontré en la web. ¿Me ayudan?`} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
