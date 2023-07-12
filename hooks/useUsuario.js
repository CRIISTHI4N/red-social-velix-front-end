import UsuarioContext from "@/context/UsuarioProvider"
import { useContext } from "react"

export const useUsuario = () => {
    return useContext(UsuarioContext)
}
