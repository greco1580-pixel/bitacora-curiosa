export type StoreMode = "preview" | "preorder" | "available";

export interface StoreConfig {
  mode: StoreMode;
  preorderDispatchStart: string | null; // Formato "DD/MM/YYYY" o ISO
  preorderDispatchEnd: string | null;   // Formato "DD/MM/YYYY" o ISO
}

export const storeConfig: StoreConfig = {
  mode: "available",
  preorderDispatchStart: null,
  preorderDispatchEnd: null,
};

// Validación de consistencia para prevenir errores en desarrollo/build
if (storeConfig.mode === "preorder") {
  if (!storeConfig.preorderDispatchStart || !storeConfig.preorderDispatchEnd) {
    throw new Error(
      "[StoreConfig Error]: Para activar el modo 'preorder' es obligatorio definir 'preorderDispatchStart' y 'preorderDispatchEnd'."
    );
  }
}