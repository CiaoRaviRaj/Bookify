import React from 'react'
import Product from "../Product"

export default function ReferbishedBooks({ data }) {
  return (
    <div className="relative z-30 mx-auto grid max-w-screen-2xl grid-flow-row-dense rounded-md border-none shadow-md md:-mt-36 md:grid-cols-2 lg:-mt-52 lg:grid-cols-3 xl:grid-cols-4">
      {data
        .map(
          (
            { id, title, pageCount, longDescription, categories, thumbnailUrl },
            index
          ) => (
            <Product
              key={index}
              id={id}
              title={title}
              price={pageCount ? pageCount : Math.floor(Math.random() * 200)}
              description={
                longDescription
                  ? longDescription
                  : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
              }
              category={categories}
              image={thumbnailUrl}
            />
          )
        )}
    </div>
  )
}
