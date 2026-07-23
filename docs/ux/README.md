# Proceso UX/UI — Novus Capital

Este directorio documenta el proceso de diseño en Figma, para que el repo muestre el camino completo "de la idea al pixel", no solo el resultado final.

## Estructura del archivo de Figma

Crear un único archivo de Figma **"Novus Capital — Design Process"** con estas 4 páginas, en este orden:

### Página 1 · Research & Flows
- 2–3 "personas" ficticias (asesor financiero, cliente HNWI, analista junior) basadas en `docs/specs/01-vision.md` sección 3
- User flow del camino crítico: Login → Dashboard → Detalle de portafolio → Insight
- Puede ser tan simple como un diagrama de cajas y flechas — el objetivo es mostrar pensamiento de proceso, no un research report elaborado

### Página 2 · Wireframes (low-fi)
- Wireframes en escala de grises de las 3 pantallas núcleo: Login, Dashboard, Portfolio Detail
- Enfoque en jerarquía de información, no en estética — validar layout antes de invertir en UI final

### Página 3 · UI Kit
- Estilos de color, texto y efectos **nombrados exactamente igual** que los tokens de `docs/specs/04-design-system.md` (ej. `color/data/positive`)
- Componentes base como variantes de Figma: Button, Card, Badge, StatBlock — espejo de `src/design-system`

### Página 4 · Hi-Fi Screens
- Las 3 pantallas núcleo ya con el UI Kit aplicado
- Un frame adicional en viewport mobile para demostrar el enfoque responsive (NFR-01)

## Checklist de handoff (Figma → código)

- [ ] Todos los estilos de color/texto usados en Hi-Fi están registrados como *Styles* de Figma (no colores sueltos)
- [ ] Cada componente de Figma tiene su equivalente 1:1 en `src/design-system`
- [ ] Capturas de las 4 páginas exportadas como PNG a `docs/ux/screenshots/` para que el proceso sea visible sin necesidad de abrir Figma
- [ ] Link del archivo de Figma agregado al README principal del repo

## Por qué este proceso importa para el portafolio

La mayoría de los repos de portafolio muestran solo el resultado (el código). Este directorio existe para mostrar el **razonamiento** detrás de las decisiones visuales — research ficticio → flujo → wireframe → sistema → pantalla final — de forma que cualquier reclutador o líder de diseño pueda seguir el hilo completo del proceso.
