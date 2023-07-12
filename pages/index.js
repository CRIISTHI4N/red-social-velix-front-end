import Image from "next/image"
import { Form } from "@/components/Form"
import { useUsuario } from "@/hooks/useUsuario"
import { createContext } from "react"

export default function Home({ URL_BACK_END }) {
  return (
    <div className='flex justify-center items-center bg-zinc-300 w-screen min-h-screen'>

      <Image
        src="/img/main-banner.jpeg"
        alt="main banner"
        width={445}
        height={300}
        className="hidden mr-10 py-9 lg:flex lg:rounded-2xl"
      />

      <Form
        URL_BACK_END={URL_BACK_END}
      />

    </div>
  )
}

export const getStaticProps = () => {

  const URL_BACK_END = process.env.URL_BACK_END
  return { props: { URL_BACK_END } }
}