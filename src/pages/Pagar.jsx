import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";

export default function Pagar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { usuario, cerrarSesion } = useAuthContext();
  const { carrito, vaciarCarrito } = useCartContext();

  // Agrupa productos iguales por id
  const productosAgrupados = carrito.reduce((acc, prod) => {
    const existente = acc.find((p) => p.id === prod.id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      acc.push({ ...prod, cantidad: 1 });
    }
    return acc;
  }, []);

  const total = productosAgrupados.reduce(
    (sum, p) => sum + p.precio * p.cantidad,
    0
  );

  const comprar = () => {
    alert("¡Compra realizada con éxito!");
    vaciarCarrito();
    navigate("/productos");
  };

  return (
    <div className="pagar-container">
      <div className="usuario-info">
        <h2>{usuario.nombre}</h2>
        <p>{usuario.email}</p>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
        <hr />
      </div>

      <div className="pagar-detalle p-5">
        <h2 className="mb-4">Tu compra</h2>

        {productosAgrupados.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <>
            {productosAgrupados.map((producto) => (
              <div key={producto.id} className="pagar-item">
                <img src={producto.avatar} alt={producto.nombre} width="80" />
                <div>
                  <h4 className="fw-bold">{producto.nombre}</h4>
                  <p>Precio: ${Number(producto.precio).toFixed(2)}</p>
                  <p className="border-bottom">Cantidad: {producto.cantidad}</p>
                  <strong>
                    Subtotal: ${(producto.precio * producto.cantidad).toFixed(2)}
                  </strong>
                </div>
              </div>
            ))}
            <hr />
            <h3 className="fw-bold ">Total a pagar: ${total.toFixed(2)}</h3>
          </>
        )}
      </div>

      <div className="pagar-botones">
        <button onClick={comprar}>Confirmar y Pagar</button>
        <button onClick={vaciarCarrito}>Vaciar Carrito</button>
        <button onClick={() => navigate("/productos")}>Cancelar</button>
      </div>
    </div>
  );
}
