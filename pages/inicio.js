import Layout from "@/layout/layout"
import { BrowserInicio } from "@/components/BrowserInicio"
import { useUsuario } from "@/hooks/useUsuario"
import { Publicacion } from "@/components/Publicacion";
import { useRouter } from "next/router";

export default function Inicio({ URL_BACK_END }) {

    const { publicacionesGenerales } = useUsuario();
    const router = useRouter()

    if (publicacionesGenerales === null) {
        router.push("/")
        router.reload();
    }

    return (

        <Layout
            topNav={<BrowserInicio />}
            URL_BACK_END={URL_BACK_END}
        >
            {publicacionesGenerales.length === 0
                ? <p className="text-center mb-4 text-xl text-white">Postea tus imagenes</p>
                : publicacionesGenerales.map(p => (
                    <Publicacion
                        key={p._id}
                        publicacion={p}
                        URL_BACK_END={URL_BACK_END}
                    />
                ))
            }

        </Layout>

    )
}

export const getStaticProps = () => {

    const URL_BACK_END = process.env.URL_BACK_END

    return { props: { URL_BACK_END } }
}
