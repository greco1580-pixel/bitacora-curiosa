# Bitácora Curiosa — sitio web (MVP)

Sitio editorial + tienda para Bitácora Curiosa. Next.js 14 (App Router),
React, TypeScript y Tailwind CSS. Mobile-first.

## 1. Concepto visual (resumen)

- **Sensación:** revista ilustrada / pequeña editorial independiente que
  también vende objetos — no un ecommerce genérico.
- **Paleta:** crema/papel, beige, tierra, verde apagado, gris cálido y
  negro suave (ver `tailwind.config.ts`).
- **Tipografías:** Fraunces (serif editorial, protagonista) + Archivo
  (sans limpia, texto general) + IBM Plex Mono (precios y "entradas de
  registro", en referencia al concepto de bitácora/cuaderno).
- **Motivo de marca:** todo se trata como una entrada de bitácora
  numerada (N.º 001, 002…), con divisores tipo costura de cuaderno y
  una pequeña "cinta de papel" en detalles editoriales. No es
  decoración al azar: refuerza la idea de "registro".
- **Qué se evitó a propósito:** esquinas muy redondeadas, sombras
  fuertes, tarjetas flotantes por todos lados, colores saturados,
  iconografía tipo SaaS, cualquier cosa kawaii o infantil.

## 2. Cómo correr el proyecto localmente

Requisitos: Node.js 18.18 o superior.

```bash
npm install
npm run dev
```

Abrir http://localhost:3000

Para producción:

```bash
npm run build
npm run start
```

## 3. Estructura de carpetas

```
app/                     Rutas (App Router)
  layout.tsx             Layout raíz: fuentes, header, footer, carrito
  page.tsx                Home
  tienda/                 Listado con filtro/orden/búsqueda
  producto/[slug]/        Página de producto dinámica
  carrito/                Carrito de página completa
  checkout/               Datos de compra y entrega + confirmación
  api/checkout/           Validación server-side y creación del pedido
  sobre/                  Sobre Bitácora Curiosa
  faq/                    Preguntas frecuentes
  contacto/               Formulario + WhatsApp
components/               Componentes de UI reutilizables
lib/                      Tipos, formateo, carrito, envío, Prisma, config comercial
prisma/                   schema.prisma, seed.ts, migraciones
data/products.ts          DATOS MOCK de productos (ver sección 5)
public/images/            Placeholders de fotos e ilustraciones
```

## 4. Qué archivos reemplazar para cargar contenido real

### Logo / nombre de marca
El nombre "Bitácora Curiosa" está como texto en `components/Header.tsx`
y `components/Footer.tsx`. Si en el futuro hay un isotipo, reemplazar
ese texto por un componente `<Image>` apuntando a
`public/images/marca/logo.svg`.

### Ilustraciones del Monstruito
- `components/Hero.tsx` — bloque placeholder del hero, comentario
  indica dónde va `public/images/marca/hero-monstruito.png`.
- `app/sobre/page.tsx` — bloque placeholder de la sección "El
  Monstruito", va `public/images/marca/sobre-monstruito.png`.
- Ver `public/images/marca/README.md` para medidas.

### Fotos de productos
- `data/products.ts`, campo `imagenes` de cada producto.
- Colocar los archivos reales en `public/images/productos/`.
- Reemplazar el bloque placeholder en `components/ProductCard.tsx` y
  en `app/producto/[slug]/page.tsx` por `<Image src={producto.imagenes[0]} ... />`
  de `next/image` una vez que existan los archivos.
- Ver `public/images/productos/README.md` para medidas.

### Productos reales (catálogo)
- Editar o reemplazar `data/products.ts`. La estructura de cada
  producto está tipada en `lib/types.ts` (`Producto`).
- Cuando haya un backend o CMS, este archivo se reemplaza por llamadas
  a una API manteniendo la misma forma de datos (`Producto[]`), para
  no tener que tocar los componentes.

### Instagram
- `components/InstagramSection.tsx` tiene un grid de 4 placeholders.
  Reemplazar por un embed oficial de Instagram, una integración con su
  API, o capturas curadas a mano.
- Actualizar el link real en `href="https://instagram.com/bitacoracuriosa"`.

### WhatsApp
- `components/WhatsAppLink.tsx` — reemplazar `NUMERO_WHATSAPP` por el
  número real, formato internacional sin signos (ej. `5491122334455`).

### Newsletter
- `components/Newsletter.tsx` — el formulario actualmente solo
  confirma en pantalla. Conectar `manejarEnvio` a un proveedor real
  (Mailchimp, Resend, Brevo, etc.) o a un endpoint propio.

### Formulario de contacto
- `app/contacto/page.tsx` — mismo caso: conectar `manejarEnvio` a un
  endpoint real (Formspree, backend propio, etc.).

## 5. Backend — estado actual

**Ya implementado:**

- Base de datos PostgreSQL con Prisma (`prisma/schema.prisma`): pedidos,
  ítems de pedido, stock vivo por producto y solicitudes de
  arrepentimiento. Ver sección 6 para configurarla.
- Carrito persistente en `localStorage` (`lib/cart-context.tsx`).
- `/checkout`: formulario de datos de compra y entrega (envío o retiro).
- `POST /api/checkout`: revalida precios y stock en el servidor, calcula
  el envío, registra el pedido como `PENDIENTE`, y si hay credenciales
  de Mercado Pago configuradas, crea la preferencia de pago en el mismo
  paso y devuelve el link de pago (`initPoint`) al que redirige el
  checkout.
- **Mercado Pago** (`lib/mercadopago.ts`, `app/api/mercadopago/webhook/route.ts`):
  creación de preferencia con el envío como línea aparte, webhook con
  validación de firma (`x-signature` / `MERCADOPAGO_WEBHOOK_SECRET`),
  idempotente, descuenta stock solo la primera vez que un pedido pasa a
  `APROBADO`. Páginas de retorno `/pago/exito`, `/pago/pendiente`,
  `/pago/error`.
- **Botón de arrepentimiento**: `/arrepentimiento` (sin login, genera
  código único, guarda la solicitud) + `POST /api/arrepentimiento`.
- **Páginas legales y faltantes**: `/privacidad`, `/terminos`,
  `/envios-cambios`, `/el-proyecto` (redirige a `/sobre`, que tiene el
  contenido), `/preguntas-frecuentes` (redirige a `/faq`, ídem),
  `/bitacora` + `/bitacora/[slug]` (índice y entrada individual — esta
  última faltaba por completo, el índice ya linkeaba a un 404).
- Home reordenada según el brief: destacados, categorías, sobre el
  proyecto, Lucía y Monstruito, franja de Mercado Pago/envío/retiro con
  el botón de arrepentimiento, Instagram, entradas recientes de la
  Bitácora, FAQ, newsletter.
- Header y footer con la navegación completa (Tienda, Bitácora, El
  proyecto, Lucía y Monstruito, Preguntas frecuentes) y enlaces legales
  visibles en el footer.
- `sitemap.ts` actualizado con todas las rutas nuevas.

`/el-proyecto` y `/preguntas-frecuentes` son las URLs canónicas: tienen
el contenido real. `/sobre` y `/faq` (rutas heredadas del MVP original)
ahora solo redirigen hacia ellas, por si quedó algún link viejo dando
vueltas.

**Todavía no implementado / pendiente de revisión:**

- **Tarifas de envío reales:** `lib/shipping.ts` tiene valores de
  demostración para solo algunas provincias. Completar el resto con
  tarifas reales antes de publicar.
- **`ENVIO_ESTIMADO` fijo en `components/CartDrawer.tsx`:** el "cajón"
  de carrito que se abre desde el header todavía muestra un envío
  estimado fijo, no usa `lib/shipping.ts`. La página `/carrito` de
  página completa y el checkout sí lo usan correctamente. Conviene
  unificarlo.
- **Datos comerciales y punto de retiro:** completar los marcadores
  `[DATOS_...]` en `lib/commerce-config.ts`, y hacer revisar los textos
  legales por alguien idóneo antes de publicar (marcado explícitamente
  en `/privacidad` y `/terminos`).
- **Cuenta de usuario:** el ícono de cuenta en el header está
  deshabilitado a propósito (`components/Header.tsx`) hasta que exista
  autenticación.
- **Analytics:** agregar el script correspondiente (Plausible, GA4,
  etc.) en `app/layout.tsx` cuando se decida cuál usar.

## 6. Base de datos (Prisma + PostgreSQL)

1. Crear una base Postgres (recomendado: Vercel Postgres, que usa Neon
   por debajo — se crea desde el dashboard de Vercel, pestaña Storage).
2. Copiar `.env.example` a `.env` y completar `DATABASE_URL` y
   `DIRECT_URL` con los datos que te da el proveedor.
3. Instalar dependencias: `npm install` (esto corre `prisma generate`
   automáticamente vía `postinstall`).
4. Crear las tablas:
   ```bash
   npm run db:push
   ```
   (para proyectos con más de una persona tocando el esquema a futuro,
   conviene pasar a `npm run db:migrate`, que genera migraciones
   versionadas en `prisma/migrations/`).
5. Cargar el stock inicial desde `data/products.ts`:
   ```bash
   npm run db:seed
   ```
6. Para inspeccionar los datos con una UI simple:
   ```bash
   npm run db:studio
   ```

**Importante:** no corrí `npm install` ni ningún comando de Prisma en
este entorno (sandbox sin acceso a red) — hay que correr los pasos de
arriba antes de dar por probado el checkout, y también:

```bash
npm run typecheck
npm run lint
npm run build
```

En Vercel: agregar `DATABASE_URL` y `DIRECT_URL` como variables de
entorno del proyecto (Settings → Environment Variables) antes del
primer deploy con estas rutas.

## 7. Accesibilidad y rendimiento ya contemplados

- HTML semántico, `aria-label` en botones de ícono, foco visible
  (`:focus-visible` en `app/globals.css`), skip-link al contenido.
- Contraste calculado sobre la paleta cálida (texto principal
  `#2A241C` sobre fondo `#F7F3EA`).
- `prefers-reduced-motion` respetado globalmente.
- Estados vacíos, de carga (`app/tienda/loading.tsx`) y de "agotado"
  implementados en tienda, producto y carrito.
- Metadata, Open Graph, `sitemap.ts` y `robots.ts` para SEO básico.

## 8. Próximos pasos sugeridos

1. Configurar la base de datos y correr el seed (sección 6). ✅ código listo, falta correrlo.
2. Cargar credenciales reales de Mercado Pago (de prueba primero) y probar el flujo de punta a punta. ✅ código listo, falta configurar y probar.
3. Completar tarifas de envío reales en `lib/shipping.ts` y los datos
   comerciales en `lib/commerce-config.ts`.
4. Cargar fotografías e ilustraciones reales (incluidas las oficiales de Lucía y Monstruito).
5. Reemplazar `data/products.ts` por el catálogo real.
6. Conectar newsletter y formulario de contacto a servicios reales.
7. Definir número de WhatsApp real.
8. Hacer revisar `/privacidad`, `/terminos` y `/arrepentimiento` por alguien idóneo en la materia antes de publicar.

## 9. Verificación (punto 17 del brief) — pendiente de correr

Este proyecto se armó en un entorno sin acceso a internet, así que **no
pude correr nada de esto yo mismo** — ni `npm install`, ni build, ni
lint, ni el flujo de pago real. Revisé cada archivo a mano (imports,
balance de llaves/paréntesis, nombres de clases de Tailwind existentes),
pero eso no reemplaza una corrida real. Antes de dar el proyecto por
probado, corré esto en orden:

1. **Instalar dependencias**
   ```bash
   npm install
   ```
2. **Lint**
   ```bash
   npm run lint
   ```
3. **Chequeo de tipos**
   ```bash
   npm run typecheck
   ```
4. **Base de datos**
   ```bash
   npm run db:push
   npm run db:seed
   ```
5. **Tests** — el proyecto no tiene tests todavía (no había ninguno en
   el MVP original). Si querés, en una próxima vuelta armo tests básicos
   con Vitest para el checkout (`lib/shipping.ts`, validación de stock
   en `app/api/checkout/route.ts`) y para el webhook de Mercado Pago
   (validación de firma, idempotencia).
6. **Build de producción**
   ```bash
   npm run build
   ```
7. **Navegación móvil y de escritorio**: recorrer todas las rutas
   listadas en la sección 3 con `npm run dev`, en un viewport angosto y
   uno ancho.
8. **Carrito y cantidades**: agregar productos, cambiar cantidades,
   intentar superar el stock, recargar la página y confirmar que el
   carrito persiste.
9. **Cálculo de envío**: probar `/checkout` con una provincia que sí
   tiene tarifa en `lib/shipping.ts` y con una que no (debe mostrar el
   mensaje de coordinación manual, nunca dejar pasar un total incorrecto).
10. **Flujo de Mercado Pago en modo de prueba**: cargar un
    `MERCADOPAGO_ACCESS_TOKEN` de test (prefijo `TEST-`), completar una
    compra, pagar con una tarjeta de prueba de Mercado Pago, y confirmar
    que el pedido pasa a `APROBADO` en la base.
11. **Páginas de retorno**: verificar `/pago/exito`, `/pago/pendiente` y
    `/pago/error` con pagos de prueba aprobados, pendientes y rechazados.
12. **Webhook**: en desarrollo local, Mercado Pago no puede pegarle a
    `localhost` — usar `ngrok` o similar para exponer el puerto y cargar
    esa URL como notification URL en las credenciales de prueba, o
    probar directamente contra un deploy de Vercel.
13. **Secretos**: confirmar que `.env` (no `.env.example`) nunca se
    commitea, y que el Access Token de Mercado Pago no aparece en
    ningún archivo del lado del cliente (`app/checkout/CheckoutClient.tsx`
    y cualquier componente con `"use client"` no deberían importar
    `lib/mercadopago.ts`).
14. **Datos inventados**: repasar `data/products.ts`,
    `lib/shipping.ts` y `lib/commerce-config.ts` buscando cualquier
    precio, tarifa o dato comercial que todavía diga "demo" o
    `[DATOS_...]`, y confirmar que ninguno se publique como si fuera real.

Ninguno de estos catorce puntos se corrió en este entorno — quedan
como lista de verificación para vos (o para mí, si me pasás los
resultados o los errores que te tire cualquiera de estos comandos y
seguimos iterando desde acá).
