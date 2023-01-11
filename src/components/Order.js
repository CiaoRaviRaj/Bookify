import moment from 'moment/moment'
import Currency from 'react-currency-formatter'
import React from 'react'

function Order({ id, amount, amountShipping, items, timestamp, images }) {
  return (
    <div className="relative rounded-full border">
      <div className="flex items-center space-x-10 bg-gray-100 p-5 text-sm text-gray-600">
        <p className="font-blod text-xs">Order Place</p>
        <p>{moment.unix(timestamp).format('DD MMM YYYY')}</p>
      </div>
      <div>
        <p className="font-blod text-xs">Total</p>
        <p>
          <Currency quantity={amount} currency="INR" /> - Next Day Delivery{' '}
          <Currency quantity={amountShipping} currency="INR" />
        </p>
        <p className="whitespace-nowwrap flex-1 self-end text-right text-sm text-blue-500 sm:text-xl">
          {items.length} items
        </p>
        <p className="text-sx absolute top-2 right-2 w-40 truncate whitespace-nowrap lg:w-72">
          ORDER # {id}
        </p>
      </div>

      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images.map((image) => (
            <img src={image} alt="" className="h-20 object-contain sm:h-32" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Order
