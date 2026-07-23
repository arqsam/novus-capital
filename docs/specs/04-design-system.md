# 04 · Sistema de Diseño — Novus Capital

Este documento es el puente entre Figma y código: todo lo que se define en Figma como estilo (color, tipografía, espaciado) se traduce 1:1 a `src/design-system/tokens.js`. Ningún componente debe usar un valor "suelto" (hex, px) que no esté aquí primero.

**Inspiración de estilo:** editorial fintech oscuro — tipografía grande y contundente, mucho espacio en blanco, acentos de color reservados casi exclusivamente para datos (crecimiento, alertas), bloques de métricas como elemento hero.

**Paleta de marca:** Novus Capital se construye sobre una escala **navy → azul → teal**, cerrada con un gris neutro. El navy profundo transmite **confianza** (código de color histórico de banca/finanzas), el teal aporta la nota **fresca y tecnológica** que evita que la marca se sienta como "banco tradicional", y el gris claro da aire y neutralidad a la tipografía sin recurrir a blanco puro (que se siente más "consumer app" que "wealth management").

| Nombre | Hex | RGB | Rol en la marca |
|---|---|---|---|
| Navy | `#201E43` | `32, 30, 67` | Base de marca — confianza, profundidad |
| Blue | `#134B70` | `19, 75, 112` | Puente — estructura, jerarquía |
| Teal | `#508C9B` | `80, 140, 155` | Acento — frescura, tecnología, interacción |
| Grey | `#EEEEEE` | `238, 238, 238` | Neutro — tipografía y superficies claras |

---

## 1. Color

### 1.1 Superficies (dark theme, sobre base navy)

| Token | Valor | Uso |
|---|---|---|
| `color.bg.base` | `#15132F` | Fondo general de la app (navy más oscuro, derivado del Navy de marca) |
| `color.bg.surface` | `#201E43` | Cards, paneles — Navy de marca tal cual |
| `color.bg.surfaceRaised` | `#2B2856` | Cards sobre cards, modales (Navy aclarado ~15%) |
| `color.border.subtle` | `rgba(238,238,238,0.10)` | Divisores, bordes de card (Grey de marca a baja opacidad) |
| `color.border.focus` | `#508C9B` | Estados de foco/accesibilidad — Teal de marca |

### 1.2 Texto

| Token | Valor | Uso |
|---|---|---|
| `color.text.primary` | `#EEEEEE` | Headlines, valores destacados — Grey de marca tal cual |
| `color.text.secondary` | `#AEB0C4` | Labels, texto de apoyo (Grey mezclado con Navy) |
| `color.text.tertiary` | `#787B96` | Metadatos, timestamps |
| `color.text.onAccent` | `#15132F` | Texto sobre fondos de acento sólido (Teal/Blue) |

### 1.3 Acento de marca

| Token | Valor | Uso |
|---|---|---|
| `color.brand.primary` | `#508C9B` | Teal — CTAs primarios, links, estado activo. Es el color "tecnológico" de la marca, así que lleva el peso de la interacción |
| `color.brand.primaryHover` | `#6FA3B1` | Hover de CTA primario (Teal aclarado) |
| `color.brand.secondary` | `#134B70` | Blue — acentos estructurales: headers de sección activos, estados seleccionados de navegación |

### 1.4 Semántico (datos financieros)

La paleta de marca no incluye verde/rojo (correctamente — esos colores se reservan 100% para significado, nunca para identidad). Se eligieron tonos que conviven con el navy/teal sin competir con `brand.primary`:

| Token | Valor | Uso |
|---|---|---|
| `color.data.positive` | `#2DD4BF` | Rendimiento positivo, insights favorables (verde-azulado, familia tonal del Teal — se lee como "marca aprobando", no como color ajeno) |
| `color.data.negative` | `#F0785A` | Rendimiento negativo, alertas (cálido, en contraste deliberado con la paleta fría) |
| `color.data.neutral` | `#AEB0C4` | Sin variación / informativo |
| `color.data.chartFillStart` | `#508C9B` (35% opacidad) | Gradiente superior del área del gráfico |
| `color.data.chartFillEnd` | `#508C9B` (0% opacidad) | Gradiente inferior del área del gráfico |

**Regla de uso:** el navy y el blue construyen la identidad (superficie, estructura); el **teal es el único color que "actúa"** (botones, links, foco, gráfico principal) — así el usuario aprende rápido que "si es teal, es interactivo o es la marca hablando". El verde/naranja semánticos solo aparecen junto a datos, nunca en elementos de navegación o marca, para que no se confundan con una señal de rendimiento.

---

## 2. Tipografía

- **Headings:** `Space Grotesk` (geométrica, contundente — coherente con el estilo de referencia)
- **Body/UI:** `Inter` (alta legibilidad en tamaños pequeños, ideal para tablas de datos)

| Token | Tamaño / Line-height | Peso | Uso |
|---|---|---|---|
| `type.display` | 56px / 64px | 600 | Hero del dashboard (ej. patrimonio total) |
| `type.h1` | 40px / 48px | 600 | Título de página |
| `type.h2` | 28px / 36px | 600 | Título de sección/card |
| `type.h3` | 20px / 28px | 500 | Subtítulos, headers de tabla |
| `type.bodyLg` | 18px / 28px | 400 | Texto de apoyo destacado |
| `type.body` | 16px / 24px | 400 | Texto estándar de UI |
| `type.small` | 14px / 20px | 400 | Labels, celdas de tabla |
| `type.caption` | 12px / 16px | 500 (uppercase, tracking +0.04em) | Metadatos, eyebrows |

---

## 3. Espaciado

Escala base 4px, para mantener ritmo vertical consistente:

`space.1 = 4px · space.2 = 8px · space.3 = 12px · space.4 = 16px · space.6 = 24px · space.8 = 32px · space.12 = 48px · space.16 = 64px · space.24 = 96px`

## 4. Radios y bordes

| Token | Valor |
|---|---|
| `radius.sm` | 6px (badges, inputs pequeños) |
| `radius.md` | 12px (botones, cards pequeñas) |
| `radius.lg` | 20px (cards principales, paneles) |
| `radius.full` | 999px (avatares, pills) |

## 5. Elevación

Sobre fondo oscuro, la elevación se comunica con **luz sutil**, no con sombras negras:

| Token | Valor |
|---|---|
| `elevation.card` | `0 1px 0 rgba(238,238,238,0.04) inset, 0 8px 24px rgba(10,9,26,0.45)` |
| `elevation.hover` | `0 0 0 1px rgba(80,140,155,0.45), 0 8px 24px rgba(10,9,26,0.55)` |

---

## 6. Componentes base (mapeo a `src/design-system`)

| Componente | Variantes | Notas de diseño |
|---|---|---|
| `Button` | `primary`, `secondary`, `ghost` | Primary usa `color.brand.primary`; radius `md`; altura fija 44px para accesibilidad táctil |
| `Card` | `default`, `raised` | `bg.surface` + `radius.lg` + `elevation.card` |
| `StatBlock` | — | Número grande (`type.display` o `type.h1`) + label (`type.caption`) + delta con color semántico + ícono de flecha |
| `Badge` | `positive`, `neutral`, `warning` | Pill (`radius.full`), texto `type.small`, fondo del color semántico al 15% de opacidad |
| `AssetTable` | — | Filas con `border.subtle` como divisor, hover con `bg.surfaceRaised` |
| `LineChart` (evolución patrimonio) | — | Línea en `color.brand.primary` (Teal) por defecto; si el contexto es explícitamente de rendimiento (ej. comparativa vs. benchmark), usar `color.data.positive`/`negative`. Área con gradiente `chartFillStart → chartFillEnd` |
| `Navbar` / navegación | `default`, `active` | Fondo `bg.base`; ítem activo con texto `brand.primary` (Teal) y una barra lateral de 2px en `brand.secondary` (Blue) |

## 7. Flujo Figma → Tokens → Código

1. **Figma:** se define un archivo con 4 páginas — `01 Research & Flows`, `02 Wireframes`, `03 UI Kit`, `04 Hi-Fi Screens` (detalle en `docs/ux/README.md`, a crear).
2. Los estilos de color/texto de Figma se nombran **exactamente igual** que los tokens de este documento (ej. el estilo de color en Figma se llama `color/data/positive`).
3. Al cerrar el UI Kit en Figma, se exportan los valores finales y se actualiza `src/design-system/tokens.js` para que coincida 1:1 — este documento se actualiza en el mismo PR.
4. Cualquier discrepancia entre Figma y código se resuelve actualizando primero este documento, nunca directamente en el componente.

## 8. Accesibilidad

- Todo texto sobre `bg.base` o `bg.surface` debe cumplir contraste AA (mínimo 4.5:1) — `text.primary` y `text.secondary` sobre estas superficies ya están validados.
- Los estados `positive`/`negative` nunca se comunican solo por color: siempre acompañados de ícono (flecha arriba/abajo) o texto ("+", "-").
- `border.focus` visible en todo elemento interactivo navegable por teclado.
