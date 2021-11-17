import { SessionProvider } from 'next-auth/react'

import 'bootstrap/dist/css/bootstrap.css'

import '../styles/globals.scss'
import '../styles/styles.scss'
import '../styles/custom.scss'
import '../styles/features.scss'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
