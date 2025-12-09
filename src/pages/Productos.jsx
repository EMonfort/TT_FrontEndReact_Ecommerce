import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CarritoCompras from "./Carrito";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useProductsContext } from "../context/ProductsContext";

export default function Productos() {
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8;

  const { agregarAlCarrito } = useCartContext();
  const { usuario } = useAuthContext();
  const { productos, cargando, error } = useProductsContext();

  const esAdmin = usuario?.nombre === "admin";

  useEffect(() => {
    document.title = "Tienda | Productos";

    // Función para actualizar meta tags
    const updateMetaTag = (name, content, attribute = "name") => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Meta tags básicos
    updateMetaTag(
      "description",
      "Explora el catálogo de juegos de mesa. Encuentra juegos históricos, clásicos, modernos y educativos."
    );
    updateMetaTag(
      "keywords",
      "juegos de mesa, juegos históricos, juegos clásicos, juegos modernos, juegos educativos"
    );
    updateMetaTag("author", "@webmaster");
    updateMetaTag("robots", "index, follow");

    // Open Graph
    updateMetaTag("og:title", "Tienda de Juegos de Mesa", "property");
    updateMetaTag(
      "og:description",
      "Explora el catálogo de juegos de mesa.",
      "property"
    );
    updateMetaTag("og:type", "website", "property");
    updateMetaTag("og:image", "https://tudominio.com/logo.jpg", "property");
    updateMetaTag("og:url", window.location.href, "property");
  }, []);

  const productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (producto.categoria &&
        producto.categoria.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  // Cambiar de página
  const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
  );
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  // Resetear a página 1 con búsquedas
  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Barra de búsqueda */}
      <div className="row mb-4">
        <div className="col-12 col-md-6">
          <label className="form-label fw-bold">Buscar productos</label>
          <input
            type="text"
            placeholder="Buscar por nombre o categoría..."
            className="form-control"
            value={busqueda}
            onChange={manejarBusqueda}
          />
          {busqueda && (
            <small className="text-muted">
              Mostrando {productosFiltrados.length} de {productos.length}{" "}
              productos
            </small>
          )}
        </div>
      </div>

      <ul id="lista-productos">
  {productosActuales.map((producto) => (
    <li key={producto.id}>
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <strong>${producto.precio}</strong>

      <img src={producto.avatar} alt={producto.nombre} />

      <Link
        to={`/productos/${producto.categoria}/${producto.id}`}
        state={{ producto }}
      >
        <button className="btn btn-primary">Más detalles</button>
      </Link>

      <button
        className="btn btn-success"
        onClick={() => agregarAlCarrito(producto)}
      >
        Comprar
      </button>

      {esAdmin && (
        <>
          <hr />
          <button
            className="btn btn-warning"
            onClick={() =>
              navigate("/formulario-producto", { state: { producto } })
            }
          >
            Editar
          </button>

          <button
            className="btn btn-danger mt-2"
            onClick={() =>
              navigate("/eliminar-productos", { state: { producto } })
            }
          >
            Eliminar
          </button>
        </>
      )}
    </li>
  ))}
</ul>
          {/* Paginador - Estilo simplificado */}
        {productosFiltrados.length > productosPorPagina && (
          <div className="d-flex justify-content-center my-4">
            {Array.from({ length: totalPaginas }, (_, index) => (
              <button
                key={index + 1}
                className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => cambiarPagina(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}


        {/* Información de la página actual */}
        {productosFiltrados.length > 0 && (
          <div className="text-center text-muted mt-2">
            <small>
              Mostrando {productosActuales.length} productos
              (página {paginaActual} de {totalPaginas})
            </small>
          </div>
        )}

      <CarritoCompras></CarritoCompras>
    </div>
  );
}
