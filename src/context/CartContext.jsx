import { createContext, useContext, useState } from "react";

//Crea el contexto
export const CartContext = createContext();

//Proveedor del contexto
export function CartProvider({children}) {


  const [carrito, setCarrito] = useState([])


  const agregarAlCarrito = (producto) => {
  setCarrito([...carrito, producto])
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }


  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.productoId != productoId))
  }

  const carritoAgrupado = carrito.reduce((acc, producto) => {
    const existente = acc.find((p) => p.id === producto.id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      acc.push({ ...producto, cantidad: 1 });
    }
    return acc;
  }, []);

  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const aumentarCantidad = (id) => {
    const producto = carrito.find((p) => p.id === id);
    setCarrito([...carrito, producto]);
  };

  const disminuirCantidad = (id) => {
    const index = carrito.findIndex((p) => p.id === id);
    if (index !== -1) {
      const nuevo = [...carrito];
      nuevo.splice(index, 1);
      setCarrito(nuevo);
    }
  };
  

  const value = {
    carrito,
    carritoAgrupado,
    agregarAlCarrito,
    vaciarCarrito,
    eliminarDelCarrito,
    setCarrito,
    eliminarProducto,
    aumentarCantidad,
    disminuirCantidad
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )

}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de AppProvider")
  }
  return context
}


