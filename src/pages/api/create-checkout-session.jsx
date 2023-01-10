import { groupBy } from 'lodash'

const stripe = require('stripe')(process.env.stipe_secret_key)
const path = require('path')

const ses = async (req, res) => {
  const { items, email } = req.body

  const groupedItems = Object.values(groupBy(items, 'id'))
  const transfromedItems = groupedItems.map((group) => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: group[0].title,
        images: [group[0].image],
      },
      unit_amount: group[0].price * 100,
    },
    description: group[0].description,
    quantity: group.length,
    adjustable_quantity: {
      enabled: true,
      minimum: 1,
      maximum: 30,
    },
  }))

  //Instead of sending an array of multiple similar values, group them to save space in session
  const groupedImages = Object.values(
    groupBy(items.map((item) => path.basename(item.image)))
  ).map((group) => [group.length, group[0]])

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['IN', 'US', 'CA', 'GB', 'CZ', 'TH'],
    },
    shipping_options: [
      {
        shipping_rate: 'shr_1MOgTISCY43mj3PxXx0ulVME',
      },
      {
        shipping_rate: 'shr_1MOgTISCY43mj3PxXx0ulVME',
      },
    ],
    line_items: transfromedItems,
    mode: 'payment',
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/checkout`,
    // discounts: [
    //   // {
    //   //   coupon: '05rEVp32',
    //   // },
    //   {
    //     coupon: '41fmeutJ',
    //   },
    // ],
    metadata: {
      email,
      images: JSON.stringify(groupedImages),
    },
  })
  console.log('session created', session.id)
  res.status(200).json({ id: session.id })
}

export default ses