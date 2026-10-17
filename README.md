# NutriVida en React

Este proyecto lo hicimos Bárbara Tolorza y Christopher Villa para DSY1104. Tomamos la página NutriVida V2 y la pasamos a React, trabajando cada parte por separado.

Usamos como referencia el proyecto original, lo visto en clases y las aclaraciones del profesor. Para preparar la base también usamos ayuda de ChatGPT. Después fuimos agregando y revisando los cambios en GitHub por etapas.

## Qué tiene la página

La página tiene Inicio, Nosotros, Servicios, Productos, Blog, Contacto y Solicitar hora. También tiene un acceso de prueba para ver las opciones de administrador, vendedor y cliente.

En Productos aparecen 18 opciones entre consultas, planes, evaluaciones y talleres. Se puede entrar al detalle de cada una. Los formularios de Contacto y Solicitar hora revisan los datos y muestran mensajes cuando hay algún error.

El acceso se encuentra en el pie de página. Estas son las cuentas para probarlo:

| Perfil | Correo | Contraseña |
| --- | --- | --- |
| Administrador | admin@duoc.cl | nutrivida |
| Vendedor | vendedor@duoc.cl | nutrivida |
| Cliente | cliente@gmail.com | nutrivida |

Es importante aclarar que esta es una página de demostración. No se envían correos, no se reservan horas y los cambios de productos o usuarios no quedan guardados.

## Cómo abrir el proyecto

Hay que tener Node.js instalado. Después se abre la carpeta del proyecto en VS Code y se ejecuta:

```bash
npm ci
npm run dev
```

La terminal mostrará la dirección para abrir la página en el navegador. Normalmente es `http://localhost:5173/`. Para cerrar el servidor, se presiona **Ctrl + C** en la terminal.

## Cómo ejecutar las pruebas

Para correr las pruebas:

```bash
npm run test:run
```

Para ver la cobertura o comprobar que el proyecto compila:

```bash
npm run coverage
npm run build
```

Probamos la navegación, los productos, los formularios y el acceso de cada perfil. En la última ejecución pasaron **22 pruebas en 3 archivos**. Los resultados están en la carpeta `documentacion`.

## Qué hizo cada uno

Bárbara trabajó en el menú y las rutas, el catálogo, las páginas públicas, los estilos para computador y celular, y las pruebas de navegación.

Christopher trabajó en los formularios y sus validaciones, el acceso de prueba, las opciones de administración y las pruebas de esas partes.

Fuimos subiendo el trabajo en ramas y usando pull requests para unirlo a `main`.