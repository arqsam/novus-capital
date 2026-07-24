# Novus Capital

> Dashboard de gestión patrimonial — **proyecto de portafolio, ficticio y con fines demostrativos.** Ningún dato financiero, usuario o institución mencionados es real.

**Novus Capital** es un caso de estudio end-to-end que demuestra un flujo profesional completo de Product Management, UX/UI, desarrollo frontend y QA, construido bajo la metodología **Spec-Driven Development (SDD)** con apoyo de ingeniería agéntica.

---

## Por qué existe este proyecto

No es "otro dashboard más". Es una demostración deliberada de proceso:

> **Visión → Requisitos trazables → Diseño en Figma → Issues → Código → Tests → Producción.**

Cada feature del producto puede rastrearse desde la necesidad de negocio que la origina hasta la línea de test que la verifica. Ese hilo de trazabilidad es, en sí mismo, el entregable más importante del repo.

## Índice de documentación (Spec-Driven Development)

| Doc | Contenido |
|---|---|
| [`docs/specs/01-vision.md`](docs/specs/01-vision.md) | Problema, usuarios objetivo, propuesta de valor, alcance |
| [`docs/specs/02-requirements.md`](docs/specs/02-requirements.md) | Historias de usuario con criterios de aceptación (Given/When/Then) |
| [`docs/specs/03-architecture.md`](docs/specs/03-architecture.md) | ADRs — decisiones técnicas y su justificación |
| [`docs/specs/04-design-system.md`](docs/specs/04-design-system.md) | Tokens de diseño derivados del proceso en Figma *(en construcción)* |
| [`docs/specs/05-api-contracts.md`](docs/specs/05-api-contracts.md) | Contratos de datos: mocks + integración real de mercado |
| [`docs/ux/`](docs/ux/) | Proceso UX/UI completo: research ficticio, flujos, wireframes, hi-fi |

## Stack técnico

- **Frontend:** React 18 + Vite + TypeScript
- **Testing:** Jest + React Testing Library
- **Datos:** capa híbrida — mocks locales + Finnhub/CoinGecko para cotizaciones reales (ver ADR-007)
- **Diseño:** Figma (proceso documentado en `docs/ux`)
- **Gestión de proyecto:** GitHub Projects (tablero enlazado más abajo)
- **CI:** GitHub Actions (lint + test + build en cada PR)

## Metodología: Spec-Driven Development + Agentic Engineering

1. Cada feature nace como una historia de usuario en `02-requirements.md`, con ID único (`NC-DASH-01`, etc.) y criterios de aceptación explícitos.
2. La historia se convierte en un issue de GitHub usando la plantilla [`feature_spec.md`](.github/ISSUE_TEMPLATE/feature_spec.md), que obliga a citar el ID de la spec.
3. El issue se implementa contra ese contrato — en este proyecto, documentando también cómo se usaron prompts estructurados como parte del proceso de desarrollo asistido por IA.
4. Los tests en `src/__tests__` referencian el mismo ID de historia en su bloque `describe()`, cerrando el ciclo de trazabilidad.

## Cómo correr el proyecto localmente

```bash
git clone <este-repo>
cd novus-capital
npm install
cp .env.example .env   # agregar tu VITE_FINNHUB_API_KEY gratuita
npm run dev
```

**Credenciales de demo** (login simulado, sin backend real):
```
usuario: demo@novuscapital.dev
password: demo1234
```

## Testing

```bash
npm run test           # correr suite completa
npm run test -- --coverage
```

## Tablero de gestión de proyecto

El progreso de cada épica (Auth, Dashboard, Portfolio Detail, Insights, Design System) se gestiona públicamente en **[GitHub Projects](https://github.com/users/arqsam/projects/2/views/1)**.

## Estado del proyecto

🚧 En construcción activa como pieza de portafolio. Cada commit refleja un paso documentado del proceso SDD descrito arriba.

## Licencia

Uso demostrativo / portafolio. Sin fines comerciales. Todos los datos son ficticios.
