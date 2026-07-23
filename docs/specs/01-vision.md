# 01 · Visión del Producto — Novus Capital

> **Nota de portafolio:** Novus Capital es una plataforma **ficticia**, construida con fines demostrativos para mostrar un flujo completo de Product Management, UX/UI, desarrollo frontend y QA. Ningún dato financiero, usuario o institución mencionados es real.

## 1. Resumen ejecutivo

Novus Capital es un dashboard de **gestión patrimonial** dirigido a asesores financieros independientes y a clientes de banca privada que necesitan visualizar, en un solo lugar, la evolución de su patrimonio, la composición de su portafolio de inversión y señales de riesgo relevantes — sin la complejidad de las herramientas institucionales tradicionales.

## 2. Problema

Los productos de gestión patrimonial actuales suelen caer en dos extremos:

- **Herramientas institucionales** (Bloomberg Terminal, plataformas bancarias legacy): potentes pero con curvas de aprendizaje altas, interfaces densas y poco enfoque en la experiencia del usuario final.
- **Apps de finanzas personales** (Mint, Fintonic): pensadas para presupuesto doméstico, no para visión patrimonial multi-activo (renta variable, renta fija, alternativos, liquidez).

Existe un vacío para un producto intermedio: **claridad visual de nivel consumer, con profundidad analítica de nivel wealth management**.

## 3. Usuarios objetivo

| Perfil | Necesidad principal | Frustración actual |
|---|---|---|
| **Asesor financiero independiente** | Presentar la posición patrimonial de un cliente de forma clara en una reunión | Hojas de cálculo o PDFs estáticos, poco visuales |
| **Cliente de banca privada (HNWI)** | Monitorear su patrimonio entre reuniones con su asesor | Portales bancarios anticuados, sin visión consolidada |
| **Analista junior** | Explorar composición y riesgo de un portafolio modelo | Herramientas fragmentadas entre Excel y sistemas internos |

## 4. Propuesta de valor

> "Toda tu posición patrimonial, en una vista. Claridad de consumer, profundidad de private banking."

- **Visión consolidada**: patrimonio total, evolución histórica y distribución por clase de activo en una sola pantalla.
- **Estética de confianza**: diseño oscuro, minimalista y editorial (inspirado en plataformas fintech de siguiente generación), que comunica seriedad sin sacrificar accesibilidad visual.
- **Insights accionables**: señales simples de riesgo/rendimiento en lenguaje natural, no solo tablas de números.

## 5. Alcance de esta demo (v1)

**Dentro de alcance:**
- Dashboard principal con patrimonio total y evolución temporal
- Vista de detalle de portafolio por clase de activo
- Panel de "insights" con métricas clave (rendimiento, riesgo, diversificación)
- Datos simulados (mock data), sin backend real ni conexión a instituciones financieras
- Autenticación simulada (mock login, sin credenciales reales)

**Fuera de alcance (explícitamente):**
- Movimientos de dinero reales o simulación de transacciones bancarias
- Integración con APIs financieras reales (Plaid, Open Banking, etc.)
- Cumplimiento regulatorio real (KYC/AML) — se documentará como *mock* únicamente
- Multi-idioma (v1 solo en español; se deja como mejora futura)

## 6. Métricas de éxito (para el propósito de portafolio)

Dado que es un proyecto demostrativo, las "métricas de éxito" se redefinen como criterios de calidad del entregable:

| Dimensión | Criterio de éxito |
|---|---|
| **Producto** | Specs trazables desde visión → requisitos → issues → código → tests |
| **UX/UI** | Proceso documentado en Figma (research ficticio → wireframes → hi-fi → design tokens) |
| **Desarrollo** | Cobertura de tests > 80% en componentes críticos, CI en verde |
| **QA** | Casos de prueba derivados directamente de criterios de aceptación (Given/When/Then) |
| **Gestión de proyecto** | Tablero de GitHub Projects reflejando el ciclo completo de cada feature |

## 7. Inspiración de estilo

El lenguaje visual toma como referencia el estilo editorial oscuro de plataformas fintech modernas: tipografía grande y contundente, fondo negro/carbón, acentos de color para datos de crecimiento, y bloques de métricas destacadas. El detalle completo vive en `04-design-system.md`.

## 8. Próximos documentos

- `02-requirements.md` — Requisitos funcionales y no funcionales, historias de usuario
- `03-architecture.md` — Decisiones técnicas y arquitectura de la solución
- `04-design-system.md` — Tokens de diseño derivados de Figma (se genera junto con el trabajo en Figma)
