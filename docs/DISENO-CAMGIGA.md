# Rediseño CAMGIGA SRL — Documento de diseño

**Dirección elegida:** A — "Buscador al frente"
**Alcance:** estructura, layout, UX, jerarquía y textos. En escala de grises, tipografía neutra del sistema.
**Fuera de alcance (lo define el dev):** paleta de colores y familias tipográficas. Este doc marca *dónde* van los acentos con tokens.

---

## Índice
1. Principios y tokens de acento
2. Pantallas clave (wireframes desktop + mobile)
3. Textos por sección + SEO (title y meta)
4. Componentes reutilizables (variantes y estados)
5. Sistema: grilla, espaciado, breakpoints, jerarquía tipográfica
6. Nota técnica para el desarrollador

---

## 1. Principios y tokens de acento

**Para quién.** Mecánicos, repuesteros, gente grande y poco tecnológica, muchas veces desde el celular en el taller. Consecuencias de diseño:

- **Mobile-first de verdad.** Todo se decide primero en 360–390 px de ancho.
- **Buscador es el héroe.** Es lo primero y más grande del inicio.
- **WhatsApp siempre a un toque.** En el header, en cada ficha, y flotante en mobile.
- **Botones cómodos.** Área táctil mínima 48×48 px, texto ≥16 px (nunca zoom involuntario en iOS).
- **Jerarquía obvia.** Un solo título por pantalla, un solo CTA primario por bloque.
- **Cero jerga técnica de web.** "Consultar", "Buscar", "Ver más", no "submit", "filtrar por facetas", etc.
- **Sin precios.** Todo es "consultar". El CTA reemplaza al precio.

**Tokens de acento** (nombres para que el dev aplique color después; acá todo es gris):

| Token | Uso | Dónde aparece |
|---|---|---|
| `--accent` | CTA primario, foco del buscador | Botón WhatsApp, "Buscar", "Consultar", borde de input enfocado |
| `--accent-strong` | hover/active del CTA primario | Estados de botón primario |
| `--ok` | disponibilidad positiva | Chip "En stock" |
| `--warn` | disponibilidad a confirmar | Chip "Consultar disponibilidad" |
| `--muted` | sin stock / deshabilitado | Chip "Sin stock", botones disabled |
| `--surface` / `--surface-alt` | fondos de sección alternados | Franjas de confianza, footer |
| `--line` | divisores, bordes de tarjeta | Hairlines, tarjetas |

> Regla: **el acento se usa con moderación.** Solo CTAs, foco y estados. El resto es neutro. Así "la pieza que buscás" y el botón de WhatsApp siempre saltan a la vista.

---

## 2. Pantallas clave

Convención de wireframe: `[ ... ]` = botón, `( ... )` = chip/estado, `🔎` = input de búsqueda, `▓` = imagen/foto, `←acento` = ahí va color.

### 2.1 Inicio

**MOBILE**
```
┌──────────────────────────────┐
│ ☰   CAMGIGA         [WhatsApp]│ ← header fijo, acento en botón
├──────────────────────────────┤
│ Encontrá el repuesto de tu    │  H1
│ camión, sin vueltas.          │
│ 25 años · primeras marcas ·   │  bajada
│ envíos a todo el país         │
│                               │
│ ┌──────────────────────────┐ │
│ │ 🔎 Buscar repuesto…       │ │ ← input grande, foco acento
│ └──────────────────────────┘ │
│ ( Camión )( Caja/Dif )( Nº )  │  solapas de modo de búsqueda
│                               │
│ Categorías                    │  H2
│ ┌──────────┐ ┌──────────┐     │
│ │ ▓        │ │ ▓        │     │
│ │ Cajas    │ │ Difer.   │     │  tarjetas de categoría 2 col
│ └──────────┘ └──────────┘     │
│ ┌──────────┐ ┌──────────┐     │
│ │ Embragues│ │ Frenos   │     │
│ └──────────┘ └──────────┘     │
│ [ Ver todo el catálogo ]      │  botón secundario
│                               │
│ ¿Por qué CAMGIGA?             │  H2
│ ✓ 25 años en el rubro         │  franja de confianza
│ ✓ Envíos a todo el país       │
│ ✓ Originales y alternativos   │
│ ✓ Amplio stock                │
│                               │
│ Trabajamos las marcas         │  H2
│ Eaton · Fuller · ZF · Meritor │  logos/nombres en fila
│ Dana · Sachs · Spicer · …     │
│                               │
│ Destacados                    │  H2
│ ┌──────────────────────────┐ │
│ │ ▓  Caja Eaton Fuller 4205 │ │  card producto (carrusel)
│ │    EF-4205 (En stock)     │ │
│ │    [ Consultar ]          │ │ ←acento
│ └──────────────────────────┘ │
│                               │
│ ¿No encontrás la pieza?       │  CTA final
│ Escribinos y la buscamos.     │
│ [ Consultar por WhatsApp ]    │ ←acento
│                               │
│  FOOTER (datos, links, mapa)  │
└──────────────────────────────┘
        (•) WhatsApp flotante ←acento
```

**DESKTOP** (contenedor máx. 1200 px)
```
┌───────────────────────────────────────────────────────────────┐
│ CAMGIGA    Catálogo  Categorías  Marcas  Nosotros  Contacto  📞 [WhatsApp]│
├───────────────────────────────────────────────────────────────┤
│  Encontrá el repuesto de tu camión, sin vueltas.               │  H1 grande
│  25 años · primeras marcas · envíos a todo el país             │
│  ┌───────────────────────────────────────────────┐            │
│  │ 🔎 Buscar por producto, código o modelo…       │ [ Buscar ] │ ←acento
│  └───────────────────────────────────────────────┘            │
│  ( Camión )  ( Caja / Diferencial )  ( Número de parte )       │
├───────────────────────────────────────────────────────────────┤
│  Categorías                                                     │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐               │  6 col
│  │Cajas│ │Difs.│ │Embr.│ │Palie│ │Fren.│ │ +   │               │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘               │
├───────────────────────────────────────────────────────────────┤
│  ✓ 25 años   ✓ Envíos a todo el país   ✓ Orig./Altern.  ✓ Stock│  franja
├───────────────────────────────────────────────────────────────┤
│  Trabajamos las marcas:  Eaton Fuller ZF Meritor Dana Sachs …  │
├───────────────────────────────────────────────────────────────┤
│  Destacados        [card][card][card][card]                    │  4 col
├───────────────────────────────────────────────────────────────┤
│  ¿No encontrás la pieza? Escribinos.   [ Consultar por WhatsApp]│ ←acento
├───────────────────────────────────────────────────────────────┤
│  FOOTER: datos · categorías · marcas · legales · mapa          │
└───────────────────────────────────────────────────────────────┘
```

### 2.2 Catálogo (con filtros)

**MOBILE** — filtros en panel deslizable (bottom sheet), no siempre visibles.
```
┌──────────────────────────────┐
│ ☰   CAMGIGA         [WhatsApp]│
├──────────────────────────────┤
│ 🔎 Buscar…                    │
│ [ Filtrar (3) ]   Orden ▾     │  botón abre panel; contador de filtros activos
│ ( Cajas ✕ )( Eaton ✕ )        │  chips de filtros activos, se quitan tocando
│                               │
│ 175 productos                 │  conteo
│ ┌──────────────────────────┐ │
│ │ ▓  Caja Eaton Fuller 4205 │ │
│ │    EF-4205 · Eaton        │ │
│ │    (En stock)             │ │
│ │    [ Consultar ]          │ │ ←acento
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │ ▓  Diferencial Meritor 240│ │
│ │    …                      │ │
│ └──────────────────────────┘ │
│           …                   │
│ [ Cargar más ]                │
└──────────────────────────────┘

  Panel "Filtrar" (se desliza desde abajo):
  ┌──────────────────────────────┐
  │ Filtrar            [ Limpiar ]│
  │ Categoría        ▾            │
  │ Marca de repuesto ▾           │
  │ Marca de camión   ▾           │
  │ Estado  ( Original )( Altern.)│
  │ [ Ver 42 resultados ]         │ ←acento
  └──────────────────────────────┘
```

**DESKTOP** — filtros fijos en columna izquierda.
```
┌───────────────────────────────────────────────────────────────┐
│ header + 🔎 buscador                                            │
├──────────────┬────────────────────────────────────────────────┤
│ Filtros      │  175 productos              Orden: Relevancia ▾  │
│ Categoría    │  ┌──────┐ ┌──────┐ ┌──────┐                     │
│ □ Cajas      │  │ ▓    │ │ ▓    │ │ ▓    │                     │
│ □ Difs.      │  │nombre│ │nombre│ │nombre│                     │  grilla 3 col
│ □ Embragues  │  │código│ │código│ │código│                     │
│ Marca rep.   │  │(stock)│ │(cons)│ │(stock)│                    │
│ □ Eaton      │  │[Cons.]│ │[Cons.]│ │[Cons.]│  ←acento         │
│ □ ZF …       │  └──────┘ └──────┘ └──────┘                     │
│ Marca camión │  ┌──────┐ ┌──────┐ ┌──────┐                     │
│ □ Mercedes … │      …                                          │
│ Estado       │  [ Cargar más ]                                 │
│ ○ Original   │                                                 │
│ ○ Alternativo│                                                 │
│ [ Limpiar ]  │                                                 │
└──────────────┴────────────────────────────────────────────────┘
```

### 2.3 Categoría (ej. Cajas de velocidades)
Igual grilla que catálogo, pero con **encabezado editorial** arriba:
```
┌───────────────────────────────────────────────────────────────┐
│ ▓ (banner sobrio de la categoría)                              │
│ Cajas de velocidades                                    H1     │
│ Manuales, automáticas y de transferencia. Cajas completas y   │
│ sus repuestos: carcazas, engranajes, sincronizados, ejes.     │
│ Modelos que cubrimos: Eaton Fuller 4005 · 4205 · 4305 · …     │  chips modelo
│ Scania GR 801 · Eaton Clark 2615 FS                           │
├───────────────────────────────────────────────────────────────┤
│  [ filtros ]        grilla de productos de la categoría        │
└───────────────────────────────────────────────────────────────┘
```

### 2.4 Ficha de producto

**MOBILE**
```
┌──────────────────────────────┐
│ ☰   CAMGIGA         [WhatsApp]│
├──────────────────────────────┤
│ Inicio › Cajas › Eaton 4205   │  breadcrumb
│ ┌──────────────────────────┐ │
│ │        ▓ galería         │ │  swipe; toque = zoom
│ │      • • ○               │ │
│ └──────────────────────────┘ │
│ Caja de velocidades           │  H1
│ Eaton Fuller 4205             │
│ Código: EF-4205               │
│ Marca: Eaton Fuller           │
│ (En stock)                    │ ←acento estado
│                               │
│ [ Consultar por WhatsApp ]    │ ←acento, ancho completo, pegajoso
│ [ Consultar por email ]       │  secundario
│                               │
│ Compatible con                │  H2
│ • Mercedes Benz 1620/1634     │
│ • Ford Cargo 1722/1730        │
│ • VW Constellation 17.220     │
│                               │
│ Descripción                   │
│ Caja manual de 5 velocidades… │
│ [ Ver despiece ]              │  abre imagen ampliable (si existe)
│                               │
│ Relacionados                  │  H2
│ [card][card]                  │  carrusel
│                               │
│ FOOTER                        │
└──────────────────────────────┘
        (•) WhatsApp flotante
```

**DESKTOP** — dos columnas: galería izquierda, info + CTAs derecha (la columna derecha "pega" al hacer scroll).
```
┌───────────────────────────────────────────────────────────────┐
│ breadcrumb                                                      │
├───────────────────────────┬───────────────────────────────────┤
│  ┌─────────────────────┐  │  Caja de velocidades Eaton 4205   │  H1
│  │      ▓ principal     │  │  Código: EF-4205 · Eaton Fuller   │
│  └─────────────────────┘  │  (En stock)              ←acento   │
│  [▓][▓][▓]  miniaturas    │  [ Consultar por WhatsApp ] ←acento│
│                           │  [ Consultar por email ]          │
│                           │  ─────────────────────────        │
│                           │  Compatible con: MB 1620, Ford …  │
│                           │  Estado: Original                 │
├───────────────────────────┴───────────────────────────────────┤
│  Descripción · Despiece ampliable                              │
│  Productos relacionados  [card][card][card][card]              │
└───────────────────────────────────────────────────────────────┘
```

### 2.5 Nosotros
```
┌───────────────────────────────────────────────────────────────┐
│  Más de 25 años consiguiendo la pieza justa.            H1     │
│  Bajada: quiénes somos en 2 frases.                            │
├───────────────────────────────────────────────────────────────┤
│  ▓ foto local / depósito     │  Historia (texto)               │
├───────────────────────────────────────────────────────────────┤
│  Qué hacemos: importamos, exportamos, originales y alternativos│
│  ┌────┐ ┌────┐ ┌────┐  (3 pilares con ícono + título + línea) │
├───────────────────────────────────────────────────────────────┤
│  Números: 25+ años · 175+ productos · envíos a todo el país    │  franja
├───────────────────────────────────────────────────────────────┤
│  Marcas que trabajamos (grilla de logos)                       │
│  CTA: ¿Buscás una pieza? [ Ver catálogo ] [ WhatsApp ] ←acento │
└───────────────────────────────────────────────────────────────┘
```

### 2.6 Contacto
```
┌───────────────────────────────────────────────────────────────┐
│  Estamos para ayudarte a encontrar tu repuesto.        H1     │
├──────────────────────────────┬────────────────────────────────┤
│  Formulario                  │  Datos directos                 │
│  Nombre        [_________]   │  📞 (011) 4228-2061  (click-call)│
│  Email         [_________]   │  💬 WhatsApp +54 9 11 6693-5999  │ ←acento
│  Teléfono      [_________]   │  ✉ info@camgiga.com.ar          │
│  Localidad     [_________]   │  📍 Av. Remedios de Escalada de  │
│  Código pieza  [_________]   │     San Martín 2055, Lanús Oeste │
│  (opcional)                  │  🕒 Horarios: [placeholder]      │
│  Consulta      [_________]   │                                 │
│                [_________]   │  ┌────────────────────────────┐ │
│  [ Enviar consulta ] ←acento │  │  ▓ MAPA (placeholder)      │ │
│                              │  └────────────────────────────┘ │
└──────────────────────────────┴────────────────────────────────┘
```

---

## 3. Textos por sección + SEO

Español rioplatense (voseo), claro, orientado a la consulta. `TITLE` ≤ 60 car., `META` ≤ 155 car.

### Inicio
- **H1:** Encontrá el repuesto de tu camión, sin vueltas.
- **Bajada:** Más de 25 años en tren motriz para camiones, maquinaria agrícola y colectivos. Primeras marcas, amplio stock y envíos a todo el país.
- **Placeholder buscador:** Buscar por producto, código o modelo de camión…
- **Solapas:** Por camión · Por caja o diferencial · Por número de parte
- **CTA buscador:** Buscar
- **H2 categorías:** ¿Qué estás buscando?
- **H2 confianza:** Por qué te conviene CAMGIGA
  - 25 años en el rubro · Envíos a todo el país · Originales y alternativos · Amplio stock permanente
- **H2 marcas:** Trabajamos las primeras marcas
- **H2 destacados:** Productos destacados
- **CTA final (H2):** ¿No encontrás la pieza? Nosotros la conseguimos.
  - Bajada: Contanos qué necesitás y te respondemos rápido.
  - Botón: Consultar por WhatsApp
- **TITLE:** CAMGIGA — Repuestos para camiones | Cajas, diferenciales, embragues
- **META:** Repuestos para camiones, maquinaria agrícola y colectivos. Cajas, diferenciales y embragues, originales y alternativos. 25 años. Envíos a todo el país.

### Catálogo
- **H1:** Catálogo de repuestos
- **Bajada:** Filtrá por categoría, marca o modelo de camión. Consultá cualquier pieza por WhatsApp.
- **Vacío (sin resultados):** No encontramos esa pieza. Probá con menos filtros o escribinos por WhatsApp y la buscamos. `[ Consultar por WhatsApp ]`
- **TITLE:** Catálogo de repuestos para camiones | CAMGIGA
- **META:** Buscá entre nuestros repuestos para camiones: cajas, diferenciales, embragues, frenos y más. Originales y alternativos. Consultá por WhatsApp.

### Categoría (patrón, ejemplo Cajas)
- **H1:** Cajas de velocidades
- **Bajada:** Cajas manuales, automáticas y de transferencia. Vendemos la caja completa y también sus repuestos: carcazas, engranajes, sincronizados y ejes.
- **Modelos que cubrimos:** Eaton Fuller 4005, 4205, 4305, 4405, 5005, 5205, 6205, 6306 · Eaton Clark 2615 FS · Scania GR 801.
- **TITLE:** Cajas de velocidades Eaton Fuller y Scania | CAMGIGA
- **META:** Cajas de velocidades y repuestos para camiones: Eaton Fuller 4205, 5205, 6306, Scania GR 801. Originales y alternativos. Consultá disponibilidad.

> Repetir el patrón para: Diferenciales, Embragues, Palieres, Tanques de combustible, Carrocerías, Frenos, Turbocompresores, Filtros, Radiadores, etc.

### Ficha de producto (plantilla dinámica)
- **H1:** `{nombre}`
- **Subdatos:** Código: `{codigo}` · Marca: `{marca}` · Estado: `{tipo}`
- **CTA primario:** Consultar por WhatsApp
- **CTA secundario:** Consultar por email
- **H2:** Compatible con → lista `{aplicacion}`
- **H2:** Descripción → `{descripcion}`
- **Botón:** Ver despiece (si hay `despiece`)
- **H2:** También te puede servir → relacionados
- **TITLE:** `{nombre} {codigo} | CAMGIGA`
- **META:** `{nombre} para {marcasCamion}. Estado {tipo}. Consultá disponibilidad y envíos por WhatsApp en CAMGIGA.`

### Nosotros
- **H1:** Más de 25 años consiguiendo la pieza que otros no tienen.
- **Bajada:** CAMGIGA SRL es una empresa argentina especializada en tren motriz para camiones, maquinaria agrícola y transporte de pasajeros.
- **Historia:** Desde hace más de 25 años importamos, exportamos y distribuimos repuestos originales y alternativos de las primeras marcas. Trabajamos para que los vehículos no paren.
- **Pilares:** Especialistas en tren motriz · Stock amplio y permanente · Envíos a todo el país
- **TITLE:** Nosotros — 25 años en repuestos para camiones | CAMGIGA
- **META:** CAMGIGA SRL, empresa argentina con más de 25 años en repuestos para camiones. Importación, exportación, primeras marcas y envíos a todo el país.

### Contacto
- **H1:** Estamos para ayudarte a encontrar tu repuesto.
- **Bajada:** Escribinos por WhatsApp, llamanos o dejanos tu consulta. Te respondemos rápido.
- **Labels form:** Nombre · Email · Teléfono · Localidad · Código de pieza (opcional) · Tu consulta
- **Botón:** Enviar consulta
- **Éxito:** ¡Recibimos tu consulta! Te contactamos a la brevedad.
- **Error:** No pudimos enviar la consulta. Probá de nuevo o escribinos por WhatsApp.
- **TITLE:** Contacto — Repuestos para camiones en Lanús | CAMGIGA
- **META:** Contactá a CAMGIGA en Lanús Oeste. WhatsApp, teléfono y email. Repuestos para camiones con envíos a todo el país.

### Legales
- **H1:** Política de privacidad — con texto estándar en español (placeholder a completar por el cliente).

---

## 4. Componentes reutilizables

Cada uno con sus variantes / estados.

- **Header**
  - Variantes: desktop (nav completa) · mobile (logo + WhatsApp + botón ☰)
  - Estados: normal · fijo al hacer scroll (sombra sutil) · menú abierto
- **Buscador (SearchBar)**
  - Variantes: héroe (grande, con solapas de modo) · compacto (en header/catálogo)
  - Estados: vacío · enfocado (borde `--accent`) · con texto · cargando · sin resultados
- **Solapas de modo de búsqueda (SearchTabs):** Camión / Caja-Dif / Nº parte — estados activa/inactiva
- **Botón (Button)**
  - Variantes: primario (`--accent`) · secundario (contorno) · fantasma (texto) · WhatsApp (con ícono)
  - Tamaños: grande (CTA táctil ≥48px) · normal
  - Estados: normal · hover (`--accent-strong`) · foco visible · deshabilitado (`--muted`) · cargando
- **Botón WhatsApp flotante (FAB):** solo mobile; fijo abajo-derecha; ícono + accesible (`aria-label`)
- **Tarjeta de producto (ProductCard)**
  - Contenido: foto · nombre · código · marca · chip disponibilidad · botón Consultar
  - Estados: en stock · consultar · sin stock (botón sigue activo = "Consultar") · sin foto (placeholder)
- **Tarjeta de categoría (CategoryCard):** foto + nombre; hover con leve elevación
- **Chip / Badge**
  - Disponibilidad: (En stock `--ok`) · (Consultar `--warn`) · (Sin stock `--muted`)
  - Filtro activo: con "✕" para quitar
  - Estado: Original / Alternativo
- **Panel de filtros (Filters)**
  - Variantes: sidebar (desktop) · bottom sheet (mobile)
  - Controles: acordeón por grupo · checkboxes · radios (estado) · botón Limpiar · botón "Ver N resultados"
- **Breadcrumb**
- **Galería de producto (Gallery):** principal + miniaturas · swipe mobile · zoom/lightbox · despiece ampliable
- **Selector de orden (SortSelect)**
- **Franja de confianza (TrustStrip):** ítems con ✓ (íconos)
- **Tira de marcas (BrandStrip):** logos/nombres, scrollable en mobile
- **Formulario de contacto (ContactForm):** inputs con label visible · validación inline · estados éxito/error
- **Bloque CTA (CtaBlock):** título + bajada + botón WhatsApp
- **Footer:** datos de contacto (click-to-call, WhatsApp, email, dirección) · columnas de links · mapa · legales · horarios (placeholder)
- **Card de esqueleto (Skeleton):** para carga de grillas

---

## 5. Sistema (grilla, espaciado, breakpoints, jerarquía)

Sin fuentes ni colores. Todo lo demás definido.

### Breakpoints
| Nombre | Ancho | Columnas grilla | Notas |
|---|---|---|---|
| `sm` | 0–599 | 4 | mobile, base del diseño |
| `md` | 600–899 | 8 | tablet vertical |
| `lg` | 900–1199 | 12 | tablet horizontal / notebook |
| `xl` | ≥1200 | 12 | desktop, contenedor tope |

- **Contenedor máx.:** 1200 px, centrado, con padding lateral 16 (sm) / 24 (md) / 32 (lg+).
- **Gutter de grilla:** 16 (sm) · 24 (md+).

### Grillas de producto
- Catálogo: 2 col (sm) → 2 (md) → 3 (lg) → 3–4 (xl).
- Categorías home: 2 col (sm) → 3 (md) → 6 (lg+).
- Destacados: carrusel (sm) → 3–4 col (lg+).

### Escala de espaciado (base 4)
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`
- Padding interno de sección: 48 (sm) / 64 (md) / 96 (lg+) vertical.
- Separación entre bloques de texto: 8/12/16. Entre secciones: 48–96.
- Radio de bordes: definir 1 solo valor (sugerido 8–12 px) o 0; lo elige el dev con la paleta.

### Jerarquía tipográfica (roles y tamaños, sin elegir familia)
Fluida con `clamp()`. Ratio ~1.25.

| Rol | Mobile → Desktop | Peso | Uso |
|---|---|---|---|
| Display / H1 | 28 → 44 px | fuerte | título de página, hero |
| H2 | 22 → 30 px | fuerte | títulos de sección |
| H3 | 18 → 22 px | medio | nombre de producto en ficha, subtítulos |
| Body-L | 17 → 19 px | normal | bajadas, intros |
| Body | 16 → 16 px | normal | texto general (mínimo 16 en mobile) |
| Small / Caption | 13 → 14 px | normal | códigos, metadatos, ayudas |
| Label / Botón | 16 → 16 px | medio | CTAs, labels de formulario |

- **Interlineado:** 1.2 títulos · 1.5 cuerpo.
- **Medida de línea:** máx. ~70 caracteres en bloques de texto.
- **Área táctil mínima:** 48×48 px en todo control.

### Accesibilidad (piso, no negociable)
- Contraste AA (el dev lo garantiza al aplicar color).
- Foco visible en todo interactivo.
- `prefers-reduced-motion` respetado.
- Labels reales en formularios (no solo placeholder).
- Jerarquía de headings correcta (un H1 por página).

---

## 6. Nota técnica para el desarrollador

### 6.1 Estructura de datos de producto
Ver `productos.example.json`. Campos clave: `id, slug, nombre, codigo, numeroParte, marca, categoria, tipo (original|alternativo), aplicacion[], marcasCamion[], disponibilidad (en-stock|consultar|sin-stock), descripcion, imagenes[], despiece?, destacado, relacionados[]`.

### 6.2 Link de WhatsApp
Base: `https://wa.me/5491166935999?text=<mensaje URL-encoded>`

Plantilla del mensaje por producto:
```
Hola CAMGIGA, quiero consultar por: {nombre} (Cód: {codigo}). ¿Tienen disponibilidad y envío?
```

Ejemplo armado (JS):
```js
function whatsappLink(producto) {
  const msg = `Hola CAMGIGA, quiero consultar por: ${producto.nombre} (Cód: ${producto.codigo}). ¿Tienen disponibilidad y envío?`;
  return `https://wa.me/5491166935999?text=${encodeURIComponent(msg)}`;
}
```
- Botón genérico (header/FAB), sin producto: `Hola CAMGIGA, quería hacer una consulta.`
- Click-to-call: `tel:+541142282061`. Email: `mailto:info@camgiga.com.ar`.

### 6.3 SEO
- **Schema.org `Product`** en cada ficha: `name, sku (codigo), brand, category, image, description`. Sin `offers`/precio → usar `Product` sin `offers` o con `offers.availability` sin `price` (se venden por consulta). Alternativa: emitir `Product` + botón de contacto, no `AggregateOffer`.
- **Schema.org `AutoPartsStore` / `LocalBusiness`** en home y contacto: `name, address (Lanús Oeste), telephone, geo, openingHours (placeholder), areaServed: Argentina, sameAs (redes)`.
- **`BreadcrumbList`** en fichas y categorías.
- URLs limpias: `/catalogo`, `/categorias/cajas-de-velocidades`, `/producto/{slug}`, `/marcas/{marca}`.
- SEO local: título/meta con "Lanús", "GBA", "Argentina"; página de contacto con dirección + mapa; Google Business Profile (recordarle al cliente).
- SEO por producto y modelo: usar `aplicacion` y `numeroParte` en title/description y en el texto visible.
- `sitemap.xml` + `robots.txt`. `og:image` por producto.

### 6.4 Performance
- **Framework sugerido:** Next.js App Router en Vercel; catálogo estático (SSG/ISR) porque los 175 productos cambian poco. Buscador y filtros del lado del cliente sobre un JSON/índice liviano.
- Imágenes: `next/image`, WebP/AVIF, `sizes` correctos, `loading="lazy"` fuera del hero, dimensiones fijas (evitar CLS).
- **Tipografía del sistema = 0 ms de carga de fuente** (ventaja del brief). Si el dev agrega una web font, que use `font-display: swap` y subset.
- JS mínimo; buscar con índice en memoria (p. ej. Fuse.js) o filtrado simple si alcanza — no traer una dependencia pesada si un `filter()` resuelve.
- `preconnect` a `wa.me`. Cachear catálogo. Core Web Vitals objetivo: LCP < 2.5s en 4G.

### 6.5 Paleta y tipografía
**Las define el desarrollador al programar.** Este diseño está en gris a propósito. Aplicar color solo en los tokens de la sección 1 (`--accent`, `--ok`, `--warn`, `--muted`, etc.) y elegir 2 familias (display + cuerpo) o una sola del sistema. Todo lo demás (layout, jerarquía, espaciado) ya está resuelto acá.

---

### Categorías (slugs sugeridos)
`cajas-de-velocidades`, `diferenciales`, `embragues`, `palieres`, `tanques-de-combustible`, `carrocerias`, `frenos`, `turbocompresores`, `filtros`, `inyeccion-electronica`, `radiadores`, `bombas-de-agua`, `electroventiladores`, `escapes`, `opticas`, `elasticos`, `tapas-de-cilindro`.
