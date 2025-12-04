import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

export default function CarritoCompras() {
  const { carrito, vaciarCarrito, carritoAgrupado, aumentarCantidad, disminuirCantidad, eliminarProducto  } = useCartContext()

  const navigate = useNavigate();  

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
