import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CarritoCompras from "./Carrito";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useProductsContext } from "../context/ProductsContext";

export default function Productos() {
  const navigate = useNavigate()

  const {agregarAlCarrito} = useCartContext()
  const {usuario} = useAuthContext()
  const { productos, cargando, error } = useProductsContext()

  const esAdmin = usuario?.nombre === "admin"

  
  if (cargando) return <p>Cargando productos...</p>
  if (error) return <p>{error}</p>
  

   return (
    <div>
    <ul id="lista-productos">
      {productos.map((producto) => (
        <li key={producto.id}>
        <h2>{producto.nombre}</h2>
          <br />
          Descripción: {producto.descripcion}
          <br />
          Precio: ${producto.precio}
          <br />
          <img src={producto.avatar} alt={producto.nombre} width="80%" />
          <Link to={`/productos/${producto.categoria}/${producto.id}`} state={{producto}}><button>Más detalles</button></Link>
          <button onClick={() => agregarAlCarrito(producto)}>Comprar</button>

           {/* Botón Editar - SOLO visible para admin */}
            {esAdmin && (
              <div>
                <hr/>
                <button
                  onClick={() => navigate('/formulario-producto', { state: { producto } }) }
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    marginRight: "10px",
                  }}
                >
                  Editar
                </button>

                <button
                  onClick={() =>
                    navigate("/eliminar-productos", {
                      state: { producto: producto },
                    })
                  }
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    marginRight: "10px",
                  }}
                >
                  Eliminar
                </button>

                </div>
            )}
        </li>
      ))}
    </ul>
    <CarritoCompras></CarritoCompras>
    </div>

  );
}