import axios from 'axios'
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import React from 'react'
import db from '../../../firebase'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import U2uFeed from '../../components/u2u/U2uFeed'

export default function index({ data }) {
  const dataSet = JSON.parse(data)

  return (
    <div className="bg-gray-100 font-sans">
      <Header />
      <U2uFeed data={dataSet} />
      <Footer />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  let data = []

  const querySnapshot = await getDocs(
    query(
      collection(db, 'u2uDatabase'),
      where('sellStatus', '==', false),
      orderBy('timestamp', 'desc'),
      limit(50)
    )
  )
  querySnapshot.forEach((doc) => {
    data.push({
      ...doc.data(),
      id: doc.id,
      timestamp: doc.data().timestamp.toDate(),
    })
  })

  return {
    props: {
      data: JSON.stringify(data),
    },
  }
}
