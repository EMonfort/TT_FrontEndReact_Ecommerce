import React, { createContext, useState, useContext, useEffect } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    //fetch("https://68d482e3214be68f8c696ae2.mockapi.io/api/productos")
    fetch("https://68f581886b852b1d6f1443f2.mockapi.io/productos")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProductos(datos);
        setCargando(false);
      })
      .catch((error) => {
        {console.error("Error!,", error)}
        setError("Hubo un problema al cargar los productos.");
        setCargando(false);
      });
  }, []);

  const validarProducto = (producto) => {
    const errores = {};

    // nombre
    if (!producto.nombre.trim()) {
      errores.nombre = 'El nombre es obligatorio.';
    }

    // precio
    if (!producto.precio.trim()) {
      errores.precio = 'El precio es obligatorio.';
    } else {
      const precioLimpio = producto.precio.replace(/\./g, '').replace(',', '.');
      const precioNumerico = parseFloat(precioLimpio);
      
      if (!/^[\d.,]+$/.test(producto.precio.replace(/\./g, ''))) {
        errores.precio = 'Solo números, puntos o comas.';
      } else if (isNaN(precioNumerico)) {
        errores.precio = 'Precio no válido.';
      } else if (precioNumerico <= 0) {
        errores.precio = 'Debe ser mayor a 0.';
      }
    }

    // descripción
    if (!producto.descripcion.trim()) {
      errores.descripcion = 'La descripción es obligatoria.';
    } else if (producto.descripcion.length < 10) {
      errores.descripcion = 'Mínimo 10 caracteres.';
    } else if (producto.descripcion.length > 200) {
      errores.descripcion = 'Máximo 200 caracteres.';
    }

    return errores
  };

  // Función para validar si el formulario es válido - nombre simplificado
  const validar = (producto) => {
    const errores = validarProducto(producto);
    return {
      esValido: Object.keys(errores).length === 0,
      errores
    };
  };

  const agregarProducto = async (producto) => {
    try {
      const productoEnviar = {
        ...producto,
        precio: producto.precio.replace(',', '.')
      };
      alert("ward")
      console.log(producto)

      const respuesta = await fetch('https://68f581886b852b1d6f1443f2.mockapi.io/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoEnviar),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el producto.');

      const data = await respuesta.json();
      alert('Producto agregado correctamente');
      return data;
    } catch (error) {
      alert('Hubo un problema al agregar el producto.');
      throw error;
    }
  };

    const editarProducto = async (productoActualizado) => {
    try {
      const respuesta = await fetch(`https://68f581886b852b1d6f1443f2.mockapi.io/productos/${productoActualizado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoActualizado),
      });

      if (!respuesta.ok) throw new Error('Error al editar el producto');

      const data = await respuesta.json();
      setProductos(prev =>
        prev.map(producto =>
          producto.id === productoActualizado.id ? data : producto
        )
      );
      return data;
    } catch (error) {
      console.error('Error al editar producto:', error);
      throw error;
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        productos,
        cargando,
        error,
        agregarProducto,
        editarProducto,
        validarProducto,
        validar
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Hook personalizado para el contexto
export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductsProvider');
  }
  return context;
};

