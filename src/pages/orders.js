import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'
import moment from 'moment/moment'
import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import db from '../../firebase'

import Header from '../components/Header'
import Order from '../components/Order'

function orders({ data1, login }) {
  const { data: session } = useSession()
  const orders = data1 //JSON.parse(data1)
  console.log(orders)
  console.log(login)
  console.log(session)
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-screen-lg p-10">
        <h1 className="pd-1 mb-2 border-b border-yellow-400 text-3xl">
          Your Orders
        </h1>

        {session ? (
          <h2>{orders?.length} Orders</h2>
        ) : (
          <h2>Please sign up to see your order</h2>
        )}

        {
          <div className="mt-5 space-y-4">
            {orders?.map(
              ({ id, amount, amountShipping, items, timestamp, images }) => (
                <Order
                  key={id}
                  id={id}
                  amount={amount}
                  amountShipping={amountShipping}
                  items={items}
                  timestamp={timestamp}
                  images={images}
                />
              )
            )}
          </div>
        }
      </main>
    </div>
  )
}

export default orders

export async function getServerSideProps(ctx) {
  const stripe = require('stripe')(process.env.stipe_secret_key)

  // Get the users logged in credentials..
  const session = await getSession(ctx)
  // console.log('sesionjhjhjhjhjhjhjhj', context.req.cookies)

  // if (!session) {
  //   return {
  //     props: {},
  //   }
  // }

  let data = []
  const dataSnap = await getDocs(
    query(
      collection(db, 'users', `rj12sept@gmail.com`, 'orders'),
      orderBy('timestamp', 'desc')
    )
  )
  dataSnap.forEach((doc) => {
    data.push({
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate(),
    })
  })

  // Stripe order
  const orders = await Promise.all(
    data.map(async (order) => ({
      id: order.id,
      amount: order.amount,
      amountShipping: order.amount_shipping,
      images: order.images,
      timestamp: moment(order.timestamp).unix(),
      items: (await stripe.checkout.sessions.listLineItems(order.id)).data,
    }))
  )

  return {
    props: {
      data1: orders,
      login: session,
    },
  }
}
