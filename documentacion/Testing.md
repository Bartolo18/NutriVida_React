# Pruebas y cobertura de NutriVida

Equipo: Bárbara Tolorza y Christopher Villa.

Este informe registra los resultados de la ejecución de pruebas de NutriVida. Sirve como base para completar la plantilla de cobertura del profesor y no sustituye el ERS.

## Estrategia y alcance

Se comprueban navegación, datos por props, formularios, acceso, cambios de estado y permisos visibles de los tres perfiles. Se utilizan entradas válidas e inválidas y se verifica que los mensajes no anuncien reservas, envíos o cambios persistidos.

La meta de trabajo de esta suite es alcanzar al menos un 80 % en cada métrica global de cobertura. Es un objetivo del proyecto, no un mínimo obligatorio establecido por la rúbrica.

Según la configuración del proyecto, se excluyen de la instrumentación main.jsx, los archivos de datos, las pruebas y el archivo de configuración inicial de las pruebas. La cobertura no evalúa CSS, disposición visual ni seguridad de un backend.

## Entorno utilizado

- Sistema de ejecución: Windows, mediante PowerShell.
- Herramienta de pruebas: Vitest 5.0.4.
- Proveedor de cobertura: v8.
- Entorno del DOM: jsdom.
- Interacción y consultas: Testing Library y user-event.

Las versiones de Node.js, npm y las dependencias se registran en Versiones.txt, generado desde el computador del equipo.

## Casos ejecutados

| ID | Comportamiento verificado | Archivo | Resultado |
| --- | --- | --- | --- |
| CP-01 | El menú abre las páginas públicas y sus contenidos. | Navegacion.test.jsx | Aprobado |
| CP-02 | La tarjeta muestra datos recibidos por props y conduce a solicitar hora. | Navegacion.test.jsx | Aprobado |
| CP-03 | Impide revisar un mensaje con campos obligatorios vacíos. | Formularios.test.jsx | Aprobado |
| CP-04 | Permite revisar un mensaje válido con el teléfono opcional vacío. | Formularios.test.jsx | Aprobado |
| CP-05 | Rechaza un dominio de correo no admitido y un teléfono incompleto. | Formularios.test.jsx | Aprobado |
| CP-06 | Retira la confirmación anterior cuando cambia el mensaje. | Formularios.test.jsx | Aprobado |
| CP-07 | Rechaza una solicitud con fecha pasada. | Formularios.test.jsx | Aprobado |
| CP-08 | Revisa una solicitud válida e informa que no existe una reserva. | Formularios.test.jsx | Aprobado |
| CP-09 | Rechaza una contraseña incorrecta sin ejecutar onIngresar. | Acceso.test.jsx | Aprobado |
| CP-10 | Entrega el perfil de administrador al ingresar con la cuenta válida. | Acceso.test.jsx | Aprobado |
| CP-11 | Muestra al administrador las herramientas de usuarios y nuevos productos. | Acceso.test.jsx | Aprobado |
| CP-12 | Permite consultar al vendedor sin mostrar herramientas exclusivas del administrador. | Acceso.test.jsx | Aprobado |
| CP-13 | Rechaza un precio negativo y un stock con decimales. | Formularios.test.jsx | Aprobado |
| CP-14 | Acepta precio y stock cero y explica que el cambio no se guarda. | Formularios.test.jsx | Aprobado |
| CP-15 | Revisa un usuario ficticio sin afirmar que creó una cuenta. | Formularios.test.jsx | Aprobado |
| CP-16 | El cliente accede a la vista pública sin herramientas de gestión. | Acceso.test.jsx | Aprobado |
| CP-17 | Carga un producto para editar y vuelve al catálogo sin modificarlo. | Acceso.test.jsx | Aprobado |
| CP-18 | Carga un usuario para editar y conserva la cuenta de prueba al volver. | Acceso.test.jsx | Aprobado |
| CP-19 | El vendedor abre y cambia el detalle de solicitudes ficticias. | Acceso.test.jsx | Aprobado |
| CP-20 | Una URL de producto abre su detalle con nombre, precio y solicitud de hora. | Navegacion.test.jsx | Aprobado |
| CP-21 | Una URL con código inexistente vuelve al catálogo completo. | Navegacion.test.jsx | Aprobado |
| CP-22 | mostrarDetalle dirige la tarjeta a la URL propia del producto. | Navegacion.test.jsx | Aprobado |

## Mocks

En CP-09 y CP-10 se utiliza vi.fn() como sustituto de la función onIngresar recibida por props.

Esto permite comprobar que una contraseña incorrecta no llama a la función del padre y que una cuenta válida entrega su perfil exactamente una vez.

No se conecta a una API ni se simula Axios. Para las solicitudes de hora se utilizan fechas ficticias pasadas y futuras.

## Resultados de la ejecución del equipo

Comando ejecutado: npm run coverage.

- Fecha de registro: 17 de octubre de 2026.
- Hora de inicio indicada por la terminal: 09:52:32.
- Duración total: 52,54 segundos.
- Archivos de pruebas: 3 aprobados y 0 fallidos.
- Casos: 22 aprobados y 0 fallidos.

| Archivo | Casos aprobados |
| --- | --- |
| Navegacion.test.jsx | 5 |
| Acceso.test.jsx | 8 |
| Formularios.test.jsx | 9 |
| Total | 22 |

### Cobertura global

| Métrica | Porcentaje obtenido | Objetivo del proyecto | Resultado |
| --- | --- | --- | --- |
| Sentencias | 90,23 % | 80 % | Cumple |
| Ramas | 85,62 % | 80 % | Cumple |
| Funciones | 95,91 % | 80 % | Cumple |
| Líneas | 91,66 % | 80 % | Cumple |

La salida compartida muestra porcentajes, pero no cantidades de elementos cubiertos y totales. Esas cantidades pueden consultarse en coverage/coverage-summary.json.

Las evidencias de la ejecución se conservan en Resultado_pruebas.txt y las versiones en Versiones.txt.

## Análisis y mejoras posibles

La cobertura global más baja es la de ramas, con 85,62 %. Esto indica que algunas alternativas de las condiciones no fueron ejecutadas por las pruebas, aunque las funciones principales sí se ejercitaron.

El informe identifica estos archivos con cobertura parcial:

| Archivo | Sentencias | Ramas | Funciones | Líneas |
| --- | --- | --- | --- | --- |
| validaciones.js | 81,57 % | 76,19 % | 100 % | 80,88 % |
| Administracion.jsx | 85,29 % | 89,74 % | 83,33 % | 90,32 % |
| FormularioUsuario.jsx | 88,88 % | 83,33 % | 85,71 % | 100 % |
| FormularioAcceso.jsx | 96,15 % | 91,66 % | 100 % | 100 % |
| FormularioHora.jsx | 100 % | 85,71 % | 100 % | 100 % |
| FormularioProducto.jsx | 100 % | 92,85 % | 100 % | 100 % |

El objetivo del 80 % se cumple globalmente. La cobertura de ramas de validaciones.js es del 76,19 %, por lo que ese archivo todavía tiene oportunidades de mejora.

El reporte señala líneas sin cobertura en validaciones.js y Administracion.jsx. Para identificar las condiciones concretas debe revisarse el detalle de coverage/index.html junto con el código fuente.

Se proponen dos ampliaciones de la suite:

1. Agregar casos de límites y formatos inválidos para nombres, correos y teléfonos, verificando el mensaje correspondiente a cada entrada.
2. Probar desde Administración los botones Nuevo producto y Nuevo usuario, comprobando la apertura del formulario y el regreso al listado.

Estas ampliaciones son propuestas; no se presentan como pruebas ejecutadas.

Durante la integración se agruparon acciones repetidas en funciones auxiliares del archivo Formularios.test.jsx. Se conservaron los nueve casos de ese archivo y las comprobaciones de comportamiento.

Una cobertura alta no demuestra por sí sola que el programa esté libre de errores.

## Límites de las pruebas

jsdom comprueba contenido y comportamiento del DOM, pero no sustituye una revisión visual en un navegador.

Las cuentas y los datos son ficticios. No se prueba autenticación de servidor ni disponibilidad real de horas, porque el proyecto no implementa esos servicios.

Los resultados corresponden únicamente a los archivos incluidos por la configuración de cobertura. El resultado de SonarCloud es una comprobación separada de la ejecución local de Vitest.

## Cómo reproducir los resultados

Desde la raíz del proyecto:

1. Ejecutar npm ci para instalar las dependencias registradas.
2. Ejecutar npm run coverage.
3. Abrir coverage/index.html para consultar el detalle.
4. Consultar coverage/coverage-summary.json para obtener cantidades cubiertas y totales.