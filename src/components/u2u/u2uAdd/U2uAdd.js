import React, { useState } from 'react'
import { Uploader } from 'uploader'
import { UploadButton } from 'react-uploader'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import db from '../../../../firebase'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function U2uAdd() {
  const uploader = Uploader({ apiKey: process.env.uplaod_js_public_key })
  const { data: session, status } = useSession()
  const router = useRouter()

  const [values, setValues] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    pin_code: '',
    category: '',
    price: 0,
    images: [],
  })
  const handleChange = async (e) => {
    e.preventDefault()
    const name = e.target.name
    let value = e.target.value
    return setValues((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      ...values,
      ownerEmail: session.user.email,
      ownerName: session.user.name,
      timestamp: serverTimestamp(),
    }
    const docRef = await addDoc(collection(db, 'u2uDatabase'), data)
    router.replace('/u2u')
  }
  return (
    <div className="mt-5 flex h-[100vh] min-h-[800px] items-center justify-center py-5">
      <div>
        <form
          onSubmit={handleSubmit}
          className="rounded-md bg-white p-5 shadow-md"
        >
          <h3 className="color-amazon my-4 rounded-sm bg-slate-50 py-5 text-center">
            Sell Your Book At Best Price
          </h3>
          {/* title */}
          <div className="mb-4 flex flex-col">
            <label className="mr-4">Title</label>
            <input
              onChange={handleChange}
              value={values.title}
              type="text"
              name="title"
              className="input"
              placeholder="title"
              required
            />
          </div>
          {/* Description */}
          <div className="mb-4 flex flex-col">
            <label className="mr-4">Description</label>
            <input
              onChange={handleChange}
              value={values.description}
              type="text"
              name="description"
              id=""
              className="input"
              placeholder="Description"
              required
            />
          </div>
          {/* category */}
          <div className="mb-4 flex flex-col">
            <label className="mr-4">Category</label>
            <input
              onChange={handleChange}
              value={values.category}
              type="text"
              name="category"
              id=""
              className="input"
              placeholder="Category"
              required
            />
          </div>
          {/* address */}
          <div className="mb-4 flex flex-col">
            <label className="mr-4">Address</label>
            <input
              onChange={handleChange}
              value={values.address}
              type="text"
              name="address"
              id=""
              className="input"
              placeholder="Address"
              required
            />
          </div>
          {/* city and pin code*/}
          <div className="mb-4 flex flex-nowrap gap-2">
            <div className="mb-4 flex flex-col">
              <label className="mr-5">City</label>
              <input
                onChange={handleChange}
                value={values.city}
                type="text"
                name="city"
                id=""
                className="input"
                placeholder="City"
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="mr-2">Pin Code</label>
              <input
                onChange={handleChange}
                value={values.pin_code}
                type="number"
                pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
                name="pin_code"
                id=""
                className="input"
                placeholder="Pin Code"
                required
              />
            </div>
          </div>

          {/* price */}
          <div className="mb-4 flex flex-col">
            <label className="mr-4">Price (in rupees)</label>
            <input
              onChange={handleChange}
              value={values.price}
              type="number"
              name="price"
              id=""
              className="input"
              placeholder="price in rupess"
              required
            />
          </div>

          {/* Image */}
          <div className="mb-[2.5rem] flex flex-col">
            <label className="mr-2">Image</label>
            <UploadButton
              uploader={uploader}
              options={{ multi: true }}
              onComplete={(files) => {
                const images = []
                files.map((x) => images.push(x.fileUrl))
                setValues((prev) => ({ ...prev, images: [...images] }))
              }}
            >
              {({ onClick }) => (
                <button className="button" onClick={onClick}>
                  Upload a image
                </button>
              )}
            </UploadButton>
            <div className="mt-4 flex h-[100px] w-[100px]">
              {values.images.map((item, index) => (
                <img key={index} src={item} className="mx-1" />
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="cancel_button"
              onClick={() => router.back()}
            >
              Cancle
            </button>
            <button type="submit" className="button py-1">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
