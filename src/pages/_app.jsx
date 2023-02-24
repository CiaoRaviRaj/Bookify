import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
// import { Provider as AuthProvider } from 'next-auth/client'

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
