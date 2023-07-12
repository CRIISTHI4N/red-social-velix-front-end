import { useState } from "react"
import Link from "next/link"
import { useUsuario } from "@/hooks/useUsuario"
import { Alerta } from "./Alerta"
import axios from "axios"
import { useRouter } from "next/router"

export const Form = ({ URL_BACK_END }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { alerta, setAlerta, setUsuario, setId, setPublicacionesGenerales } = useUsuario();

    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los capos son obligatorios',
                alerta: true
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return;
        }

        try {

            const { data: usuario } = await axios.post(`${URL_BACK_END}/usuario/login`, { email, password })

            const { data: publicaciones } = await axios.get(`${URL_BACK_END}/usuario/publicaciones`)

            localStorage.setItem('usuario', JSON.stringify(usuario))
            setUsuario(usuario);
            setId(usuario._id)

            localStorage.setItem('publicaciones', JSON.stringify(publicaciones))
            setPublicacionesGenerales(publicaciones)

            router.push("/inicio")

        } catch (error) {

            setAlerta({
                msg: error.response.data.msg,
                alerta: true
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
        }
    }

    const { msg } = alerta

    return (
        <div>
            <div className="w-full mb-3 sm:w-[435px] sm:m-auto sm:mb-3 sm:border sm:border-neutral-400 px-10 py-28">

                <h2 className="text-black text-5xl text-center my-6">Velix</h2>

                {msg && <Alerta alerta={alerta} />}

                <form
                    onSubmit={handleSubmit}
                    className="text-black"
                >
                    <input
                        type="email"
                        className="w-full border border-neutral-400 rounded-md mb-2 outline-none focus:border-neutral-500 p-2 bg-stone-300"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        className="w-full border border-neutral-400 rounded-md mb-4 outline-none focus:border-neutral-500 p-2 bg-stone-300"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <input
                        type="submit"
                        value="Entrar"
                        className="bg-sky-500 w-full py-2 rounded-xl
                    text-white font-bold mb-1 cursor-pointer hover:bg-sky-600"
                    />

                    <div className="flex justify-between items-center">
                        <div className="w-full h-[1px] bg-neutral-400"></div>
                        <span className="p-4 text-neutral-500 font-bold">O</span>
                        <div className="w-full h-[1px] bg-neutral-400"></div>
                    </div>
                </form>
            </div>

            <div className="w-full sm:w-[435px] sm:m-auto sm:border sm:border-neutral-400 py-5">
                <p className="block text-center text-black">
                    ¿No tienes una cuenta?
                    <Link
                        href="/crearCuenta"
                        className="ml-1 text-sky-900"
                    >
                        Crear Cuenta
                    </Link>
                </p>
            </div>
        </div>
    )
}

