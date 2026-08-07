# 02 · Requisitos — Novus Capital

> Este documento traduce la visión (`01-vision.md`) en requisitos verificables. Cada historia de usuario tiene criterios de aceptación en formato **Given/When/Then**, que se convertirán directamente en:
> - Issues de GitHub (una historia = uno o más issues)
> - Casos de prueba en Jest / React Testing Library
> - Tarjetas del tablero de GitHub Projects

## Convención de nomenclatura

`NC-<épica>-<número>` — ej. `NC-DASH-01` = Épica Dashboard, historia 1.

---

## Épica 1 · Autenticación (mock)

### NC-AUTH-01 — Inicio de sesión simulado
**Como** usuario de Novus Capital
**Quiero** iniciar sesión con credenciales de demostración
**Para** acceder a mi panel patrimonial sin fricción

**Criterios de aceptación:**
- **Given** que estoy en la pantalla de login
  **When** ingreso las credenciales de demo provistas en el README
  **Then** soy redirigido al dashboard principal
- **Given** que ingreso credenciales inválidas
  **When** envío el formulario
  **Then** veo un mensaje de error claro sin recargar la página
- **Given** que no he iniciado sesión
  **When** intento acceder directamente a `/dashboard`
  **Then** soy redirigido a `/login`

**No funcional:** No se almacena ninguna contraseña real; el mock usa un usuario/token fijo en memoria.

---

## Épica 2 · Dashboard principal

### NC-DASH-01 — Vista de patrimonio total
**Como** cliente de banca privada
**Quiero** ver mi patrimonio total consolidado al entrar
**Para** tener una foto inmediata de mi situación financiera

**Criterios de aceptación:**
- **Given** que inicié sesión correctamente
  **When** cargo el dashboard
  **Then** veo el patrimonio total, la variación vs. el período anterior (%, monto) y la fecha de corte
- **Given** que los datos están cargando
  **When** la vista se renderiza
  **Then** se muestra un estado de carga (skeleton), nunca una pantalla en blanco

### NC-DASH-02 — Evolución histórica del patrimonio
**Como** cliente
**Quiero** ver la evolución de mi patrimonio en el tiempo
**Para** entender la tendencia, no solo el valor puntual

**Criterios de aceptación:**
- **Given** que estoy en el dashboard
  **When** visualizo el gráfico de evolución
  **Then** puedo alternar entre rangos (1M, 6M, 1A, Todo)
- **Given** que paso el cursor sobre el gráfico
  **When** hago hover sobre un punto
  **Then** veo un tooltip con fecha y valor exacto

### NC-DASH-03 — Distribución por clase de activo
**Como** asesor financiero
**Quiero** ver la composición del portafolio por clase de activo
**Para** explicarle a mi cliente su nivel de diversificación

**Criterios de aceptación:**
- **Given** que el portafolio tiene activos en al menos 3 clases (renta variable, renta fija, alternativos, liquidez)
  **When** visualizo el panel de distribución
  **Then** veo un gráfico de composición (donut/stacked) con porcentaje por clase
- **Given** que hago clic en una clase de activo
  **When** el clic se registra
  **Then** navego al detalle de esa clase (ver Épica 3)

---

## Épica 3 · Detalle de portafolio

### NC-PORT-01 — Listado de activos por clase
**Como** analista junior
**Quiero** ver el detalle de activos dentro de una clase
**Para** explorar posiciones individuales

**Criterios de aceptación:**
- **Given** que entro al detalle de una clase de activo
  **When** la vista carga
  **Then** veo una tabla con: nombre del activo, monto, % del total de la clase, rendimiento del período
- **Given** que la tabla tiene más de 10 activos
  **When** se renderiza
  **Then** existe paginación u ordenamiento por columna

---

## Épica 4 · Panel de insights

### NC-INS-01 — Señales de riesgo y rendimiento
**Como** cliente
**Quiero** recibir señales simples sobre riesgo y rendimiento
**Para** entender mi situación sin interpretar tablas complejas

**Criterios de aceptación:**
- **Given** que el portafolio tiene datos de riesgo simulados
  **When** cargo el panel de insights
  **Then** veo al menos 3 tarjetas de insight (ej. "Diversificación saludable", "Concentración en un solo activo", "Rendimiento por encima del benchmark")
- **Given** que un insight indica una alerta (ej. sobreconcentración)
  **When** se muestra la tarjeta
  **Then** usa un color/ícono distinto al de insights neutrales o positivos

---

### NC-PORT-02 — Cotizaciones de mercado reales con fallback
**Como** cliente o asesor
**Quiero** ver precios de mercado reales para los activos cotizables de mi portafolio
**Para** confiar en que los valores reflejan condiciones de mercado actuales

**Criterios de aceptación:**
- **Given** que un activo tiene ticker cotizable (acción, ETF o cripto)
  **When** el dashboard carga su precio
  **Then** el valor proviene de Finnhub (acciones/ETFs) o CoinGecko (cripto), no de datos hardcodeados
- **Given** que la API externa falla o excede el rate limit
  **When** el componente intenta obtener el precio
  **Then** se muestra un valor de respaldo (mock) junto a un badge visual "Datos simulados", sin romper la interfaz
- **Given** que un precio ya fue consultado en los últimos 60 segundos
  **When** se vuelve a solicitar
  **Then** se sirve desde caché en memoria, sin generar una nueva llamada a la API

---

## Épica 5 · Contacto con asesor

### NC-CONTACT-01 — Solicitar contacto con un ejecutivo (mock)
**Como** cliente
**Quiero** poder indicar que quiero contactar a un ejecutivo desde el detalle de mi portafolio
**Para** iniciar una conversación sin tener que salir del dashboard ni buscar un canal externo

**Nota de alcance:** en esta primera iteración el widget **no es un chat real** — no hay backend, no hay persistencia, no hay conexión con ningún ejecutivo real. Es una simulación de la intención (mock), coherente con el carácter demostrativo de todo el proyecto (ver `01-vision.md` sección 5).

**Criterios de aceptación:**
- **Given** que estoy en la vista de detalle de portafolio
  **When** el widget de contacto se renderiza
  **Then** veo un mensaje que pregunta si quiero contactar a un ejecutivo, con un botón de confirmación ("Sí, contactar") y una opción de descarte ("No, gracias")
- **Given** que hago clic en "Sí, contactar"
  **When** se registra el clic
  **Then** veo un mensaje de confirmación simulado (ej. "Un ejecutivo se pondrá en contacto contigo pronto"), sin que se envíe ninguna solicitud real a ningún sistema
- **Given** que hago clic en "No, gracias" o cierro el widget
  **When** se registra la acción
  **Then** el widget se oculta/colapsa sin bloquear ni tapar el resto de la vista de portafolio

**No funcional:** el widget es un componente autocontenido — no introduce una ruta nueva ni depende de `src/services` (a diferencia de las cotizaciones de mercado, acá no hay integración externa real, ver ADR-007 para contraste).

---

## Requisitos no funcionales

| ID | Requisito |
|---|---|
| NFR-01 | La aplicación debe ser responsive (mobile, tablet, desktop) |
| NFR-02 | Tiempo de carga inicial < 2s en entorno de desarrollo (Vite build de producción) |
| NFR-03 | Cobertura de pruebas Jest ≥ 80% en `src/components` y `src/design-system` |
| NFR-04 | Cumplir contraste mínimo AA de WCAG en texto sobre fondo oscuro |
| NFR-05 | Todo dato mostrado debe provenir de `src/mocks`, nunca hardcodeado en componentes |
| NFR-06 | El pipeline de CI (GitHub Actions) debe ejecutar lint + test en cada PR |
| NFR-07 | La API key de servicios externos (Finnhub) nunca se commitea; se gestiona vía `.env` + `.env.example` |
| NFR-08 | Toda llamada a una API externa debe tener manejo explícito de error y timeout, con fallback a datos mock |

## Fuera de alcance (recordatorio)

Ver sección 5 de `01-vision.md`: sin transacciones reales, sin integraciones bancarias reales, sin KYC/AML real.

## Trazabilidad

Cada historia de este documento debe mapearse 1:1 a:
1. Un issue en GitHub con la etiqueta de su épica (`epic:dashboard`, `epic:auth`, etc.)
2. Una tarjeta en el tablero de GitHub Projects
3. Al menos un archivo de test en `src/__tests__` que referencie el ID de la historia en su descripción (`describe('NC-DASH-01...')`)
