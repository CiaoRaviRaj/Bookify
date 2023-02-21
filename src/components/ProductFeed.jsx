import Product from './Product'
import { ToastContainer } from 'react-toastify'

function ProductFeed({ products }) {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="relative z-30 mx-auto grid max-w-screen-2xl grid-flow-row-dense rounded-md border-none shadow-md md:-mt-36 md:grid-cols-2 lg:-mt-52 lg:grid-cols-3 xl:grid-cols-4">
        {/* z-30 relative max-w-screen-2xl mx-auto   */}
        {products
          .slice(0, 4)
          .map(
            (
              {
                id,
                title,
                pageCount,
                longDescription,
                categories,
                thumbnailUrl,
              },
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

        <img
          className="my-2 md:col-span-full"
          src="/product_feed_banner.jpg"
          alt=""
        />

        <div className="md:col-span-2">
          {products
            .slice(4, 5)
            .map(
              ({
                id,
                title,
                pageCount,
                longDescription,
                categories,
                thumbnailUrl,
              }) => (
                <Product
                  key={id}
                  id={id}
                  title={title}
                  price={pageCount}
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

        {products
          .slice(5, 40)
          .map(
            ({
              _id,
              title,
              pageCount,
              longDescription,
              categories,
              thumbnailUrl,
            }) => (
              <Product
                key={_id}
                id={_id}
                title={title}
                price={pageCount}
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
    </>
  )
}

export default ProductFeed
