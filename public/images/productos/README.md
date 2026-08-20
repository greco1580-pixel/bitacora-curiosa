# Imágenes de productos

Esta carpeta es donde van las fotografías reales de cada producto.

- Formato: `.jpg` o `.webp`
- Relación de aspecto: 4:5 (por ejemplo 1200x1500px)
- Estilo: fondo neutro o textura de papel, luz natural, coherente con la
  identidad de Bitácora Curiosa (nada de fondos de estudio genéricos)
- Cada producto en `data/products.ts` tiene un array `imagenes` con las
  rutas esperadas. Reemplazá esos archivos o actualizá las rutas.

Mientras no haya fotos reales, `ProductCard` y la página de producto
muestran un bloque placeholder con el número de entrada del producto.
