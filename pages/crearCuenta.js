import { useState } from "react"
import { Alerta } from "@/components/Alerta"
import { useUsuario } from "@/hooks/useUsuario"
import Link from "next/link"
import axios from "axios"

export default function CrearCuenta({ URL_BACK_END }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState('')
    const [fullName, setFullName] = useState('')

    const { alerta, setAlerta } = useUsuario();

    const handleSubmit = async e => {
        e.preventDefault();

        if ([email, password, user, fullName].includes('')) {
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

            const { data } = await axios.post(`${URL_BACK_END}/usuario/registro`, { email, password, user, fullName })

            setAlerta({
                msg: data.msg,
                alerta: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);

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
        <div className='flex justify-center items-center bg-zinc-300 w-screen min-h-screen'>

            <div>
                <div className="w-full mb-3 sm:w-[435px] sm:m-auto sm:mb-3 sm:border sm:border-neutral-400 px-10">

                    <h2 className="text-black text-5xl text-center mt-14 mb-5">Velix</h2>

                    <p className="text-center text-gray-600 font-bold text-xl mb-14">Regístrate para ver fotos y videos de tus amigos</p>

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
                            type="text"
                            className="w-full border border-neutral-400 rounded-md mb-4 outline-none focus:border-neutral-500 p-2 bg-stone-300"
                            placeholder="Nombre de usuario"
                            value={user}
                            onChange={e => setUser(e.target.value)}
                        />

                        <input
                            type="text"
                            className="w-full border border-neutral-400 rounded-md mb-4 outline-none focus:border-neutral-500 p-2 bg-stone-300"
                            placeholder="Nombre completo"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                        />

                        <input
                            type="submit"
                            value="Registrarse"
                            className="bg-sky-500 w-full py-2 rounded-xl text-white font-bold mb-14 cursor-pointer"
                        />

                    </form>
                </div>

                <div className="w-full sm:w-[435px] sm:m-auto sm:border sm:border-neutral-400 py-5">
                    <p className="block text-center text-black">
                        ¿Tienes una cuenta?
                        <Link
                            href="/"
                            className="ml-1 text-sky-900"
                        >
                            Inicia Sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export const getStaticProps = () => {

    const URL_BACK_END = process.env.URL_BACK_END

    return { props: { URL_BACK_END } }
}