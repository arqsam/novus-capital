---
name: Feature (derivada de spec)
about: Un issue que implementa una historia de usuario ya definida en docs/specs/02-requirements.md
title: "[NC-XXX-00] Título breve de la feature"
labels: []
# ⬆ Asigná manualmente una épica al crear el issue: epic:auth · epic:dashboard · epic:portfolio · epic:insights · epic:design-system
---

## ID de historia
<!-- Ej. NC-DASH-01. Debe existir en docs/specs/02-requirements.md antes de abrir este issue. -->

## Historia de usuario
<!-- Copiar tal cual desde 02-requirements.md -->
**Como** ...
**Quiero** ...
**Para** ...

## Criterios de aceptación (Given/When/Then)
<!-- Copiar tal cual desde la spec. No reinterpretar aquí — si algo no queda claro, se corrige la spec primero. -->
- **Given** ...
  **When** ...
  **Then** ...

## Diseño
- [ ] Enlace al frame de Figma correspondiente:
- [ ] Tokens de diseño nuevos requeridos (si aplica):

## Definición de terminado (Definition of Done)
- [ ] Componente implementado según los criterios de aceptación
- [ ] Tests en `src/__tests__` que referencian este ID de historia en `describe()`
- [ ] Cobertura de tests no reduce el umbral global (NFR-03)
- [ ] Pasa lint y build en CI
- [ ] Actualiza el tablero de GitHub Projects a "Done"

## Notas de implementación agéntica (opcional)
<!-- Si se usó un prompt estructurado para generar parte del código, documentarlo aquí como parte del proceso demostrativo -->
