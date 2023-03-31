import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import Header from '../components/Header'
import Footer from '../components/Footer'
// import { Provider as AuthProvider } from 'next-auth/client'

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        {loading ? (
          <div className="flex h-[100vh] w-[100vw] items-center justify-center">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <Component {...pageProps} />
          </>
        )}
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
