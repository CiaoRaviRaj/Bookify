import { useRouter } from 'next/router'
import React from 'react'
import U2uCard from './u2uCard/U2uCard'

export default function U2uFeed({ data }) {
  const router = useRouter()

  return (
    <div className=" py-2">
      <button
        onClick={() => router.push('/u2u/add')}
        type="button"
        className="button float-right mr-2 mb-20 rounded-md"
      >
        Sell Your Book
      </button>
      <div className="relative z-30 mx-auto grid max-w-screen-2xl grid-flow-row-dense rounded-md border-none shadow-md md:mt-[50px] md:grid-cols-2 lg:mt-[60px] lg:grid-cols-3 xl:grid-cols-4">
        {data.map(
          ({
            id,
            title,
            price,
            description,
            category,
            images,
            address,
            city,
            pin_code,
          }) => (
            <U2uCard
              id={id}
              title={title}
              price={price}
              description={description}
              address={`${address} city: ${city} pin code: ${pin_code}`}
              category={category}
              image={images}
            />
          )
        )}
      </div>
    </div>
  )
}
