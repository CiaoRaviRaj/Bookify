import React from 'react'
import Header from '../../components/Header'
import Banner from '../../components/Banner'
import ReferbishedBooks from '../../components/referbishedBooks/ReferbishedBooks'
import { books_data } from '../../BooksData'
import Footer from '../../components/Footer'

export default function index({ data }) {
  return (
    <div className="bg-gray-100 font-sans">
      <Header />
      <main className="max-h-screen-1xl mx-auto max-w-screen-2xl">
        <Banner />
        <ReferbishedBooks data={data} />
      </main>
      <Footer />
    </div>
  )
}

export const getServerSideProps = async () => {
  const data = [books_data]
  const dataset = [...data[0].slice(0, 1), ...data[0].slice(2)]
  const refData = [...dataset.slice(100, 200)]
  return {
    props: {
      data: refData,
    },
  }
}
