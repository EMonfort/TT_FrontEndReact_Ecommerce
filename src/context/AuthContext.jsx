import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

//Crea el contexto
export const AuthContext = createContext();

export function AuthProvider({children, onLogout}) {
  const [usuario, setUsuario] = useState(null)
  const navigate = useNavigate();


  // Verificar token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const emailGuardado = localStorage.getItem("authEmail");
    if (token) {
      const username = token.replace("fake-token-", "");
      setUsuario({
        nombre: username,
        email: emailGuardado || "",
      });
    }
  }, []);

  // Función para iniciar sesión
  const iniciarSesion = (username) => {
    const token = `fake-token-${username}`;
    localStorage.setItem("authToken", token);

    const emailGuardado = localStorage.getItem("authEmail");
    setUsuario({
      nombre: username,
      email: emailGuardado || "",
    });
  };

    // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authEmail");
    setUsuario(null);    
    if (onLogout) {
      onLogout();
    }
    navigate("/productos")
  };

  const value = {
    //Autenticación
    usuario,
    setUsuario,
    cerrarSesion,
    iniciarSesion,
    isAuthenticated: !!usuario, // ← Propiedad computada
  }

  return  (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AppProvider")
  }
  return context
}