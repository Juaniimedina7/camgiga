import { SearchIcon } from './icons'

// Buscador. Form GET → /catalogo?q=... (funciona sin JS, bueno para SEO y para el público).
export function SearchBar({
  hero = false,
  defaultValue = '',
  placeholder = 'Buscar por producto, código o modelo…',
}: {
  hero?: boolean
  defaultValue?: string
  placeholder?: string
}) {
  return (
    <form className={`search${hero ? ' search--hero' : ''}`} action="/catalogo" method="get" role="search">
      <input
        className="search__input"
        type="text"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-label="Buscar repuesto"
        autoComplete="off"
      />
      <button className="btn btn--primary" type="submit">
        <SearchIcon />
        <span className="btn__label">Buscar</span>
      </button>
    </form>
  )
}
