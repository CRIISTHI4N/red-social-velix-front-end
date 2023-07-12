import '@/styles/globals.css'
import { UsuarioProvider } from '@/context/UsuarioProvider'

import { Roboto } from 'next/font/google'
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900']
})

export default function App({ Component, pageProps }) {
  return (
    <UsuarioProvider>
      <div className={roboto.className}>
        <Component {...pageProps} />
      </div>
    </UsuarioProvider>
  )
}


