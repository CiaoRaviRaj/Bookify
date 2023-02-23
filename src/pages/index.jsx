
import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import ProductFeed from '../components/ProductFeed'
import { getSession } from 'next-auth/react'
import { API_GET_DATA_URL } from '../constants/commonConstants'
import { books_data } from '../BooksData'

export default function Home({  dataSet }) {
  // console.log(process.env.GOOGLE_ID)

  return (
    <div className="bg-gray-100 font-sans">
      <Head>
        <link rel="icon" src="/favicon.ico" />
        <title>E-Commerce Web</title>
      </Head>
      <Header />
      <main className="max-h-screen-1xl mx-auto max-w-screen-2xl">
        <Banner />
        <ProductFeed products={dataSet} />
      </main>
      <Footer />
    </div>
  )
}

//Server side fetching api data
export async function getServerSideProps(context) {
  const session = await getSession(context)
  // const products = await fetch(API_GET_DATA_URL).then((res) => res.json())
  const data = [books_data]
  const dataSet = [...data[0].slice(0, 1), ...data[0].slice(2)]

  return {
    props: {
      
      session,
      dataSet,
    },
  }
}
