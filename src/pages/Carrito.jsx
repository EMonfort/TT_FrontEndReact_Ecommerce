import React from "react";
import { useNavigate } from "react-router-dom";

export default function CarritoCompras({ carrito, setCarrito }) {
  const navigate = useNavigate();

  // Agrupar productos por id
  const carritoAgrupado = carrito.reduce((acc, producto) => {
    const existente = acc.find((p) => p.id === producto.id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      acc.push({ ...producto, cantidad: 1 });
    }
    return acc;
  }, []);

  const vaciarCarrito = () => {
    setCarrito([]);
  };

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

  const irAPagar = () => {
    navigate("/pagar", { state: { carrito } });
  };

  const total = carrito.reduce((sum, item) => sum + Number(item.precio), 0);

  return (
    <div className="carrito-container">
      <hr />
      <h2>🛒 Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <div className="carrito-lista">
            {carritoAgrupado.map((item) => (
              <div key={item.id} className="carrito-item">
                <img src={item.avatar} alt={item.nombre} />
                <div className="carrito-info">
                  <span className="carrito-nombre">{item.nombre}</span>
                  <span className="carrito-precio">
                    ${Number(item.precio).toFixed(2)}
                  </span>
                </div>
                <div className="carrito-cantidad">
                  <button onClick={() => disminuirCantidad(item.id)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => aumentarCantidad(item.id)}>+</button>
                </div>
                <button
                  className="carrito-eliminar"
                  onClick={() => eliminarProducto(item.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="carrito-total">
            <hr />
            <strong>Total: ${Number(total).toFixed(2)}</strong>
          </div>

          <div className="carrito-botones">
            <button onClick={vaciarCarrito}>Vaciar Carrito</button>
            <button onClick={irAPagar}>Pagar</button>
          </div>
        </>
      )}
    </div>
  );
}
