"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  producto: any;
  varianteId?: string | number | null;
  cantidad: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  abrirCarrito: () => void;
  cerrarCarrito: () => void;
  agregarAlCarrito: (producto: any, varianteId?: string | number | null, cantidad?: number) => void;
  eliminarDelCarrito: (index: number) => void;
  actualizarCantidad: (index: number, cantidad: number) => void;
  limpiarCarrito: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Carga inicial desde localStorage si existe
  useEffect(() => {
    try {
      const guardado = localStorage.getItem("bitacora_carrito");
      if (guardado) setItems(JSON.parse(guardado));
    } catch (e) {
      console.error("Error cargando carrito:", e);
    }
  }, []);

  // Persistencia en localStorage
  useEffect(() => {
    try {
      localStorage.setItem("bitacora_carrito", JSON.stringify(items));
    } catch (e) {
      console.error("Error guardando carrito:", e);
    }
  }, [items]);

  const abrirCarrito = () => setIsOpen(true);
  const cerrarCarrito = () => setIsOpen(false);

  const agregarAlCarrito = (producto: any, varianteId?: string | number | null, cantidad = 1) => {
    if (!producto) return;

    setItems((prevItems) => {
      const indexExistente = prevItems.findIndex(
        (item) => item.producto.id === producto.id && item.varianteId === varianteId
      );

      if (indexExistente > -1) {
        const nuevosItems = [...prevItems];
        nuevosItems[indexExistente].cantidad += cantidad;
        return nuevosItems;
      }

      return [...prevItems, { producto, varianteId, cantidad }];
    });

    // Abre el drawer automáticamente para dar feedback visual inmediato
    setIsOpen(true);
  };

  const eliminarDelCarrito = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const actualizarCantidad = (index: number, cantidad: number) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(index);
      return;
    }
    setItems((prev) => {
      const nuevos = [...prev];
      nuevos[index].cantidad = cantidad;
      return nuevos;
    });
  };

  const limpiarCarrito = () => setItems([]);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        abrirCarrito,
        cerrarCarrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        limpiarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    // Retorna funciones de respaldo por si se invoca antes de la hidratación de React
    return {
      items: [],
      isOpen: false,
      setIsOpen: () => {},
      abrirCarrito: () => {},
      cerrarCarrito: () => {},
      agregarAlCarrito: () => {},
      eliminarDelCarrito: () => {},
      actualizarCantidad: () => {},
      limpiarCarrito: () => {},
    };
  }
  return context;
}