# 03 · Arquitectura — Novus Capital

Este documento describe las decisiones técnicas de la solución, siguiendo el formato de **ADR (Architecture Decision Record)** resumido para cada decisión clave, más una descripción general de la arquitectura.

## 1. Visión general de la arquitectura

```
┌─────────────────────────────────────────────┐
│                Navegador                     │
│  ┌─────────────────────────────────────────┐ │
│  │            React App (Vite)              │ │
│  │  ┌───────────┐  ┌───────────────────┐    │ │
│  │  │  Router    │→ │  Pages             │    │ │
│  │  └───────────┘  │  - Login           │    │ │
│  │                  │  - Dashboard       │    │ │
│  │                  │  - PortfolioDetail │    │ │
│  │                  └─────────┬──────────┘    │ │
│  │                            ↓                │ │
│  │                  ┌───────────────────┐     │ │
│  │                  │  Componentes UI    │     │ │
│  │                  │  (design-system)   │     │ │
│  │                  └─────────┬──────────┘     │ │
│  │                            ↓                │ │
│  │                  ┌───────────────────┐     │ │
│  │                  │  Capa de datos     │     │ │
│  │                  │  (mocks + hooks)   │     │ │
│  │                  └───────────────────┘     │ │
│  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

No hay backend real: la "capa de datos" es un conjunto de módulos en `src/mocks` que simulan respuestas de API (incluyendo latencia artificial, para poder mostrar estados de carga de forma realista).

## 2. Decisiones de arquitectura (ADRs)

### ADR-001 — React + Vite como base del frontend
**Contexto:** se necesita un stack moderno, rápido de levantar y ampliamente reconocido en procesos de selección técnica.
**Decisión:** usar React 18+ con Vite como bundler/dev server.
**Consecuencias:** arranque de proyecto casi instantáneo, HMR rápido; documentación abundante para quien revise el repo.

### ADR-002 — Sin backend real; capa de mocks tipada
**Contexto:** el proyecto es demostrativo; un backend real añadiría complejidad sin aportar al objetivo de portafolio.
**Decisión:** simular la capa de datos con funciones async en `src/mocks` que retornan JSON con retraso artificial (`setTimeout`/`Promise`), documentadas como si fueran contratos de API real (ver `05-api-contracts.md`, a definir).
**Consecuencias:** se puede reemplazar por un backend real en el futuro sin tocar componentes, si los hooks de datos están bien encapsulados (ver ADR-004).

### ADR-003 — Jest + React Testing Library para QA
**Contexto:** se requiere demostrar disciplina de testing, no solo funcionalidad.
**Decisión:** Jest como test runner, React Testing Library para pruebas centradas en comportamiento (no en implementación).
**Consecuencias:** los tests se escriben contra los criterios de aceptación de `02-requirements.md`, facilitando trazabilidad spec → test.

### ADR-004 — Patrón de hooks para acceso a datos
**Contexto:** desacoplar componentes de la fuente de datos (mock hoy, API real en un futuro hipotético).
**Decisión:** cada entidad de datos (patrimonio, portafolio, insights) se expone vía un custom hook (`usePortfolio()`, `useNetWorth()`, `useInsights()`) que internamente llama a los mocks.
**Consecuencias:** los componentes de UI nunca importan mocks directamente; siempre consumen hooks. Esto facilita el testing con mocks de los propios hooks.

### ADR-005 — Design system como capa independiente
**Contexto:** se quiere demostrar un proceso de UX/UI real, con tokens trazables desde Figma.
**Decisión:** `src/design-system` contiene tokens (colores, tipografía, espaciados) exportados como JS/JSON, y componentes base (Button, Card, Badge, StatBlock) que consumen esos tokens.
**Consecuencias:** cualquier cambio en Figma se refleja actualizando el archivo de tokens, sin tocar componentes de página.

### ADR-006 — Gestión de estado con Context + hooks (sin librería externa)
**Contexto:** el alcance de datos es pequeño (usuario autenticado, portafolio activo); una librería de estado global (Redux, Zustand) sería sobreingeniería para esta demo.
**Decisión:** usar React Context para el estado de sesión (auth mock); estado de datos financieros vive en los hooks de la capa de datos (ADR-004), con cache simple en memoria.
**Consecuencias:** menor complejidad; si el proyecto creciera, se documentaría un ADR de migración.

### ADR-007 — Integración de API de mercado real para precios de activos
**Contexto:** se busca dar mayor realismo a los datos mostrados sin ampliar el alcance a un backend propio (ver ADR-002). El patrimonio del cliente y su historial siguen siendo ficticios porque no existe un usuario real detrás, pero las **cotizaciones de los activos** (acciones, ETFs, cripto como clase "alternativos") pueden ser reales.
**Decisión:**
- Se integra **Finnhub** (free tier, ~60 req/min) para cotizaciones de acciones/ETFs, y **CoinGecko** (sin API key requerida) para la clase de activo "alternativos/cripto".
- Las llamadas viven en `src/services/marketData.js`, detrás de los mismos hooks definidos en ADR-004 (`usePortfolio()` internamente combina posiciones simuladas con precios reales obtenidos vía `marketData.js`).
- La API key de Finnhub se maneja como variable de entorno (`VITE_FINNHUB_API_KEY`), nunca hardcodeada ni committeada; el repo incluye `.env.example`.
- Se implementa una capa de **caché en memoria con TTL corto** (ej. 60s) para no exceder el rate limit gratuito y para no golpear la API en cada render.
- Se define un **fallback explícito**: si la API real falla o se excede el rate limit, la UI cae a datos mock estáticos y muestra un badge visual "Datos simulados" — nunca falla silenciosamente ni deja la pantalla en blanco.

**Consecuencias:**
- El proyecto demuestra manejo de integraciones externas reales: fetch asíncrono, manejo de errores de red, rate limiting, variables de entorno y estrategias de caché — sin requerir backend propio ni comprometer el alcance definido en la visión.
- Se añade una dependencia de disponibilidad de terceros; por eso el fallback a mock es obligatorio, no opcional, para que la demo nunca se vea rota.
- Se documenta explícitamente en el README que los precios de mercado son reales (delay de free tier) pero el patrimonio/portafolio del "cliente" es ficticio — para evitar cualquier confusión sobre el carácter demostrativo del proyecto.

### ADR-008 — TypeScript como lenguaje del proyecto
**Contexto:** `05-api-contracts.md` define los contratos de datos usando sintaxis de tipos, lo cual solo tiene valor real si el código los aplica en tiempo de compilación, no solo como documentación.
**Decisión:** el scaffold de Vite se genera con la variante `TypeScript` (no `TypeScript + React Compiler`, para priorizar estabilidad y legibilidad sobre optimizaciones experimentales; tampoco `JavaScript`, para no perder la validación de los contratos).
**Consecuencias:** todos los archivos de componentes y hooks usan extensión `.tsx`/`.ts`; los tipos de `05-api-contracts.md` se trasladan literalmente a `src/types/` (o junto a cada hook) y se importan donde corresponda; se agrega `@types/*` según haga falta para librerías como Recharts.

## 3. Estructura de carpetas

```
src/
├── components/          # Componentes de página (no genéricos)
│   ├── dashboard/
│   ├── portfolio/       # incluye ContactAdvisorWidget.tsx (NC-CONTACT-01, mock sin backend)
│   └── insights/
├── design-system/        # Componentes base + tokens
│   ├── tokens.ts
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── StatBlock.tsx
│   └── Badge.tsx
├── hooks/                # useNetWorth, usePortfolio, useInsights
├── services/              # marketData.ts (Finnhub + CoinGecko), caché con TTL
├── mocks/                # Datos y funciones simuladas de API
├── pages/                # Login, Dashboard, PortfolioDetail
├── context/              # AuthContext
├── types/                 # Tipos compartidos, trasladados de 05-api-contracts.md
├── __tests__/            # Tests organizados espejo de src/
└── App.tsx / main.tsx
```

## 4. Estrategia de testing

| Nivel | Herramienta | Qué cubre |
|---|---|---|
| Unitario | Jest | Funciones puras (formateadores de moneda, cálculos de %) |
| Componente | React Testing Library | Renderizado, interacción, estados (loading/error/success) |
| Integración ligera | RTL + mocks de hooks | Flujo login → dashboard → detalle |

Cada test debe referenciar el ID de historia de `02-requirements.md` en su `describe()` para mantener trazabilidad spec → test.

## 5. CI/CD

GitHub Actions ejecuta, en cada Pull Request:
1. `npm ci`
2. `npm run lint`
3. `npm run test -- --coverage`
4. `npm run build`

El PR no es "mergeable" si algún paso falla (branch protection rule documentada en el README).

## 6. Próximo documento

`04-design-system.md` se generará una vez definido el trabajo en Figma, documentando los tokens finales (color, tipografía, espaciado) que alimentan `src/design-system/tokens.js`.
