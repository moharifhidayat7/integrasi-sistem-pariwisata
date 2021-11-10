import { Provider } from 'next-auth/client'

import 'bootstrap/dist/css/bootstrap.css'

import '../styles/globals.scss'
import '../styles/styles.scss'
import '../styles/custom.scss'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
