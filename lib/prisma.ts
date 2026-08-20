import { PrismaClient } from "@prisma/client";

// Singleton estándar de Prisma para entornos serverless (Vercel), evita
// agotar conexiones por recrear el cliente en cada hot-reload / invocación.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
