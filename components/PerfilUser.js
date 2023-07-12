import { useUsuario } from "@/hooks/useUsuario"
import { useEffect } from "react"
import { Post } from "./Post"
import axios from "axios"

export const PerfilUser = ({ URL_BACK_END }) => {

    const {
        usuario,
        publicaciones,
        id,
        setPublicaciones
    } = useUsuario();
    const { user } = usuario

    const verificarPublicaciones = async id2 => {
        if (!usuario) {
            console.log('Cargando...');
        } else {
            if (usuario._id === undefined) {
                console.log('Cargando...');
            } else {
                try {
                    const { data: publicaci } = await axios.get(`${URL_BACK_END}/usuario/publicacion/${id2}`)

                    setPublicaciones(publicaci);

                } catch (error) {
                    console.log(error.message);
                }
            }
        }
    }

    useEffect(() => {
        verificarPublicaciones(id);
    }, [id])

    return (
        <div>
            <div className="flex gap-3 items-center text-white mb-6 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xl">{user}</span>
            </div>

            <div className="text-white border-t border-t-stone-500">
                <div
                    className="flex flex-col justify-center items-center p-2"
                >
                    <span className="font-bold">{publicaciones.length}</span>
                    <span className="text-gray-300">Publicaciones</span>
                </div>
            </div>

            {
                publicaciones.length
                    ? (
                        <div className="grid grid-cols-3 gap-1 lg:gap-2">

                            {publicaciones.map(publicacion => (
                                <Post
                                    key={publicacion._id}
                                    publicacion={publicacion}
                                    URL_BACK_END={URL_BACK_END}
                                />
                            ))}
                        </div>
                    )
                    : <p className="text-xl text-center mt-11 uppercase text-white">Sin publicaciones</p>
            }

        </div>
    )
}

