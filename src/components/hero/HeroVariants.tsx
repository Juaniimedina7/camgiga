import { HeroCarousel, HERO_PHOTOS } from './HeroCarousel'

function Search({ variant }: { variant: string }) {
  return (
    <form className={`hv-search hv-search--${variant}`} action="/catalogo" method="get" role="search">
      <input className="hv-search__input" type="text" name="q" placeholder="Buscá: Eaton 4205, diferencial Meritor…" aria-label="Buscar repuesto" autoComplete="off" />
      <button className="hv-search__btn" type="submit">Buscar</button>
    </form>
  )
}

/* V1 — Cinemático full-bleed: carrusel de fondo + titular gigante */
export function HeroCine() {
  return (
    <section className="hv hv1">
      <HeroCarousel images={HERO_PHOTOS} className="hv1__car" />
      <div className="hv1__scrim" aria-hidden="true" />
      <div className="container hv1__content">
        <h1 className="hv1__title">
          <span className="hv1__l1">Tenemos la pieza</span>
          <span className="hv1__l2">que nadie</span>
          <span className="hv1__l3">consiguió.</span>
        </h1>
        <p className="hv1__sub">Cajas, diferenciales y embragues para camiones, maquinaria agrícola y colectivos. Primeras marcas y envíos a todo el país.</p>
        <Search variant="cine" />
      </div>
    </section>
  )
}

/* V2 — Split técnico: texto a la izquierda, carrusel enmarcado + badge a la derecha */
export function HeroSplit() {
  return (
    <section className="hv hv2">
      <div className="hv2__grid-bg" aria-hidden="true" />
      <div className="container hv2__grid">
        <div className="hv2__left">
          <h1 className="hv2__title">La pieza que <span className="hv2__accent">nadie</span> consiguió.</h1>
          <p className="hv2__sub">Especialistas en tren motriz hace más de 25 años. Primeras marcas, amplio stock, envíos a todo el país.</p>
          <Search variant="split" />
          <div className="hv2__chips">
            <span>Por camión</span><span>Por caja o diferencial</span><span>Por N° de parte</span>
          </div>
        </div>
        <div className="hv2__right">
          <HeroCarousel images={HERO_PHOTOS} className="hv2__car" />
          <span className="hv2__badge"><b>25</b><small>años</small></span>
        </div>
      </div>
    </section>
  )
}

/* V3 — Editorial kinético: fondo claro, titular negro enorme, tira de fotos + bloque de color */
export function HeroKinetic() {
  return (
    <section className="hv hv3">
      <div className="container">
        <h1 className="hv3__title">
          La pieza<br />que <span className="hv3__mark">nadie</span><br />consiguió.
        </h1>
        <div className="hv3__row">
          <div className="hv3__strip">
            <HeroCarousel images={HERO_PHOTOS} interval={2600} className="hv3__car" />
          </div>
          <div className="hv3__panel">
            <p>Tren motriz para camiones, agro y colectivos. 25 años, primeras marcas, envíos a todo el país.</p>
            <Search variant="kin" />
          </div>
        </div>
      </div>
    </section>
  )
}
