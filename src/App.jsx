import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import Navbar from "./pages/Navbar";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/DetalleProductos";
import Pagar from "./pages/Pagar";
import RutaProtegida from "./pages/RutaProtegida";
import IniciarSesion from "./pages/IniciarSesion";
import { CartProvider, useCartContext } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductsContext";
import Dashboard from "./pages/Dashboard";
import FormularioProducto from "./components/FormularioProducto";
import EliminarProducto from "./components/EliminarProducto";

function App() {
  return (
    <CartProvider>
      <InnerAuthProvider>
        <ProductsProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
          <Route path="/productos/:catgoria/:id" element={<ProductoDetalle />}/>
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/pagar" element={<RutaProtegida><Pagar /></RutaProtegida>}/>
          <Route path="/dashboard" element={<RutaProtegida soloAdmin={true}><Dashboard /></RutaProtegida>}/>
          {/* RUTA PROTEGIDA - Admin */}
          <Route path="/formulario-producto" element={<RutaProtegida soloAdmin={true}><FormularioProducto /></RutaProtegida>}/>
          <Route path="/eliminar-productos" element={<RutaProtegida soloAdmin={true}><EliminarProducto /></RutaProtegida>}/>
        </Routes>
      </div>
      </ProductsProvider>
      </InnerAuthProvider>
    </CartProvider>
  );
}

// Este componente existe solo para poder usar el CartContext
function InnerAuthProvider({ children }) {
  const { vaciarCarrito } = useCartContext();

  return (
    <AuthProvider onLogout={vaciarCarrito}>
      {children}
    </AuthProvider>
  );
}

export default App;
