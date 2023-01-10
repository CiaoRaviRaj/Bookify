import moment from 'moment/moment'
import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import db from '../../firebase'
import Header from '../components/Header'
import Order from '../components/Order'

function orders({ orders }) {
  const { data: session } = useSession()
  console.log(orders)

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-screen-lg p-10">
        <h1 className="pd-1 mb-2 border-b border-yellow-400 text-3xl">
          Your Orders
        </h1>

        {session ? (
          <h2>x Orders</h2>
        ) : (
          <h2>Please sign up to see your order</h2>
        )}

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
      </main>
    </div>
  )
}

export default orders

export async function getServerSideProps(context) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

  // Get the users logged in credentials..
  const session = await getSession(context)

  if (!session) {
    return {
      props: {},
    }
  }
  //   const stripeOrders = await db
  //     .collection('users')
  //     .doc(session.user.email)
  //     .collection('orders')
  //     .orderBy('timestamp', 'desc')
  //     .get()
  const stripeOrders = {
    docs: [],
  }

  // Stripe order
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toData()).unix(),
      items: await stripe.checkout.sessions.listLineItems(order, id, {
        limit: 100,
      }).data,
    }))
  )
  return {
    props: {
      orders,
    },
  }
}
