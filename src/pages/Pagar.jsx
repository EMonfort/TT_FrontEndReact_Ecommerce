import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";

export default function Pagar() {
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useAuthContext();
  const { carrito, vaciarCarrito } = useCartContext();

  // Agrupa productos
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
    <div className="container my-4">

      {/* INFO DEL USUARIO */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h3 className="mb-2">Datos del comprador</h3>
          <p className="mb-1 fw-bold">{usuario.nombre}</p>
          <p className="text-muted">{usuario.email}</p>

          <button className="btn btn-outline-danger btn-sm" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* DETALLE DE PRODUCTOS */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h3 className="mb-4">Tu compra</h3>

          {productosAgrupados.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <>
              {productosAgrupados.map((producto) => (
                <div
                  key={producto.id}
                  className="d-flex align-items-center gap-3 border-bottom pb-3 mb-3"
                >
                  <img
                    src={producto.avatar}
                    alt={producto.nombre}
                    width="90"
                    height="90"
                    className="rounded"
                    style={{ objectFit: "cover" }}
                  />

                  <div className="flex-grow-1">
                    <h5 className="fw-bold mb-1">{producto.nombre}</h5>
                    <p className="mb-1">Precio: ${Number(producto.precio).toFixed(2)}</p>
                    <p className="mb-1">Cantidad: {producto.cantidad}</p>
                    <p className="fw-bold">
                      Subtotal: ${(producto.precio * producto.cantidad).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              <h3 className="fw-bold text-end mt-3">
                Total a pagar: ${total.toFixed(2)}
              </h3>
            </>
          )}
        </div>
      </div>

      {/* BOTONES */}
      <div className="d-flex justify-content-between gap-3">
        <button className="btn btn-success flex-grow-1" onClick={comprar}>
          Confirmar y Pagar
        </button>

        <button className="btn btn-warning flex-grow-1" onClick={vaciarCarrito}>
          Vaciar Carrito
        </button>

        <button className="btn btn-secondary flex-grow-1" onClick={() => navigate("/productos")}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
