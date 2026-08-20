// Carga el stock inicial en la base de datos a partir de /data/products.ts.
// Correr con: npm run db:seed
//
// Esto NO copia el catálogo (nombre, precio, imágenes) a la base: eso sigue
// viviendo en el código. Solo siembra el número de stock vivo por producto
// (y por variante, si tiene) para que el checkout tenga algo real contra lo
// que validar. Después de esta carga inicial, el stock se actualiza a mano
// o con un script propio — no hay panel de administración.

import { PrismaClient } from "@prisma/client";
import { productos } from "../data/products";

const prisma = new PrismaClient();

async function main() {
  for (const producto of productos) {
    const stockVariantes: Record<string, number> = {};
    for (const variante of producto.variantes ?? []) {
      stockVariantes[variante.id] = variante.stock;
    }

    await prisma.productoStock.upsert({
      where: { productoId: producto.id },
      update: {
        slug: producto.slug,
        stock: producto.stock,
        stockVariantes
      },
      create: {
        productoId: producto.id,
        slug: producto.slug,
        stock: producto.stock,
        stockVariantes
      }
    });
  }

  console.log(`Stock sembrado para ${productos.length} productos.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
