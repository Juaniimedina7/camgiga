import { SearchIcon } from '../icons'
import { heroPreview } from '../../lib/preview'

// Buscador protagonista (estilo editorial V3): tabs + barra con sombra offset.
function PartsFinder({ hint }: { hint?: string }) {
  return (
    <div className="finder3">
      <div className="finder3__tabs" aria-hidden="true">
        <span className="finder3__tab is-on">Por camión</span>
        <span className="finder3__tab">Por caja o diferencial</span>
        <span className="finder3__tab">Por número de parte</span>
      </div>
      <form className="finder3__bar" action="/catalogo" method="get" role="search">
        <SearchIcon className="finder3__icon" />
        <input className="finder3__input" type="text" name="q" placeholder="Buscá por producto, código o modelo…" aria-label="Buscar repuesto" autoComplete="off" />
        <button className="finder3__btn" type="submit">Buscar</button>
      </form>
      {hint ? <p className="finder3__hint">{hint}</p> : null}
    </div>
  )
}

// V3 — Editorial kinético: titular gigante, buscador protagonista, tira de fotos.
export function HeroKinetic({ hint }: { hint?: string }) {
  return (
    <section className="hv hv3">
      <div className="container">
        <h1 className="hv3__title">
          La pieza<br />que <span className="mark">nadie</span><br />consiguió.
        </h1>
        <p className="hv3__sub">
          Tren motriz para camiones, maquinaria agrícola y colectivos. 25 años, primeras marcas, envíos a todo el país.
        </p>
        <PartsFinder hint={hint} />
        <div className="hv3__strip">
          <img className="hv3__img" src={heroPreview()} alt="Repuestos para camiones — CAMGIGA" />
        </div>
      </div>
    </section>
  )
}
