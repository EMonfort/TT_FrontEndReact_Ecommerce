import React from 'react'
import { Link, } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useCartContext } from '../context/CartContext'

function Navbar() {

  const { usuario, cerrarSesion} = useAuthContext();
  const { carrito } = useCartContext();

  return (
    <nav>
        <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            {/* ENLACE PARA ADMIN - Solo visible para admin */}
            {usuario?.nombre === "admin" && (
              <li>
                <Link to="/formulario-producto">Agregar Producto</Link>
              </li>
            )}
            {/* Carrito */}
            <li className="nav-item">
            <Link className="nav-link" to="/pagar">
              🛒 Carrito ({carrito.length})
            </Link>
              </li>
              {usuario ? (
                <>
                <li>
                  <span>Hola, {usuario.nombre}</span>
                </li>
            
              
                <div>
                  {/* ENLACE DASHBOARD solo para admin */}
                  {usuario.nombre === "admin" && (
                    <li>
                      <div>
                    <Link to="/dashboard" style={{margin: '0 10px'}}>
                      Dashboard
                    </Link>
                    </div>
                    </li>
                  )}  
                  
                </div>
             
            <li>
              <button onClick={cerrarSesion}>
                    Cerrar Sesión
                  </button>
            </li>
             </>) : (
              <li>
                <Link to="iniciar-sesion">Iniciar Sesión</Link>
                </li>
              )
            }
        </ul>
    </nav>
  )
}

export default Navbar