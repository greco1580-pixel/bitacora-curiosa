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
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const guardado = localStorage.getItem("bitacora_carrito");
      return guardado ? JSON.parse(guardado) : [];
    } catch (e) {
      console.error("Error cargando carrito:", e);
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    setCargado(true);
  }, []);

  useEffect(() => {
    if (!cargado) return;
    try {
      localStorage.setItem("bitacora_carrito", JSON.stringify(items));
    } catch (e) {
      console.error("Error guardando carrito:", e);
    }
  }, [items, cargado]);

  const abrirCarrito = () => setIsOpen(true);
  const cerrarCarrito = () => setIsOpen(false);

  const agregarAlCarrito = (producto: any, varianteId?: string | number | null, cantidad = 1) => {
    if (!producto) return;

    const stockDisponible = producto?.stock ?? 0;
    if (stockDisponible <= 0) return;

    setItems((prevItems) => {
      const indexExistente = prevItems.findIndex(
        (item) => item.producto.id === producto.id && item.varianteId === varianteId
      );

      if (indexExistente > -1) {
        const nuevosItems = [...prevItems];
        const cantidadActual = nuevosItems[indexExistente].cantidad;
        // Limita la suma total al stock disponible
        nuevosItems[indexExistente].cantidad = Math.min(cantidadActual + cantidad, stockDisponible);
        return nuevosItems;
      }

      // Limita la cantidad inicial al stock disponible
      return [...prevItems, { producto, varianteId, cantidad: Math.min(cantidad, stockDisponible) }];
    });

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
      if (index < 0 || index >= prev.length) return prev;
      
      const nuevos = [...prev];
      const stockDisponible = nuevos[index].producto?.stock ?? 0;
      
      // Bloquea incrementos por encima del stock existente
      nuevos[index].cantidad = Math.min(cantidad, stockDisponible);
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