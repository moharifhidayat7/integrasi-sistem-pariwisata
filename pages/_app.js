import { SessionProvider } from 'next-auth/react'

import 'bootstrap/dist/css/bootstrap.css'

import '../styles/globals.scss'
import '../styles/styles.scss'
import '../styles/custom.scss'
import '../styles/features.scss'
import { GlobalProvider } from '@components/Contexts/KeranjangContext'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <GlobalProvider>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <Component {...pageProps} />
      </SessionProvider>
    </GlobalProvider>
  )
}

export default MyApp
