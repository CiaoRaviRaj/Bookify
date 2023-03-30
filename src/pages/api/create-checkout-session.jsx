import { groupBy } from 'lodash'

const stripe = require('stripe')(process.env.stipe_secret_key)
const path = require('path')

const ses = async (req, res) => {
  const { items, email } = req.body

  // const groupedItems = Object.values(groupBy(items, 'id'))
  const transfromedItems = items.map((group) => ({
    price_data: {
      currency: 'inr',
      unit_amount: group.price * 100,
      product_data: {
        name: group.title,
        description: group.description,
        images: [group.image],
      },
    },
    quantity: 1,
  }))

  // //Instead of sending an array of multiple similar values, group them to save space in session
  // const groupedImages = Object.values(
  //   groupBy(items.map((item) => path.basename(item.image)))
  // ).map((group) => [group.length, group[0]])

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['IN', 'US', 'CA', 'GB', 'CZ', 'TH'],
    },
    shipping_options: [
      {
        shipping_rate: 'shr_1MOgTISCY43mj3PxXx0ulVME',
      },
    ],
    line_items: [...transfromedItems],
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,

    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  })
  console.log('session created', session.id)
  res.status(200).json({ id: session.id })
}

export default ses
