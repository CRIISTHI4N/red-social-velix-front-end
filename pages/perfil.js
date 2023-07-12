import Layout from "@/layout/layout"
import { BrowserInicio } from "@/components/BrowserInicio"
import { PerfilUser } from "@/components/PerfilUser"

export default function Perfil({ URL_BACK_END }) {
    return (
        <Layout
            topNav={<BrowserInicio />}
            URL_BACK_END={URL_BACK_END}
        >
            <PerfilUser
                URL_BACK_END={URL_BACK_END}
            />
        </Layout>
    )
}

export const getStaticProps = () => {

    const URL_BACK_END = process.env.URL_BACK_END

    return { props: { URL_BACK_END } }
}
