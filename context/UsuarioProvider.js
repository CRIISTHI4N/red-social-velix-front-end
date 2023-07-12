import { createContext } from "react"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {

  const [usuario, setUsuario] = useState({})
  const [alerta, setAlerta] = useState({})
  const [publicaciones, setPublicaciones] = useState([]);
  const [publicacionesGenerales, setPublicacionesGenerales] = useState([]);
  const [id, setId] = useState('')

  const router = useRouter()

  useEffect(() => {
    setUsuario(JSON.parse(localStorage.getItem('usuario')))
    setPublicacionesGenerales(JSON.parse(localStorage.getItem('publicaciones')))

    if (!localStorage.getItem('usuario')) {
      return
    } else {
      setId(JSON.parse(localStorage.getItem('usuario'))._id || " ");
    }
  }, [])


  const cerrarSesion = () => {
    setUsuario({})
    setPublicaciones([])
    setPublicacionesGenerales([])
    setId('');
    localStorage.removeItem('usuario')
    localStorage.removeItem('publicaciones')
    router.push("/")
  }

  return (
    <UsuarioContext.Provider
      value={{
        alerta,
        setAlerta,
        usuario,
        setUsuario,
        publicaciones,
        setPublicaciones,
        cerrarSesion,
        setId,
        id,
        setPublicacionesGenerales,
        publicacionesGenerales,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  )
}

export default UsuarioContext;
