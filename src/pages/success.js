import Header from '../components/Header'
import Footer from '../components/Footer'
import SuccessCard from '../components/SuccessCard'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'

function Success() {
  const router = useRouter()
  return (
    <div className="">
      <Header />
      <div className=" mx-auto my-4 max-w-screen-lg ">
        <div className="flex flex-col bg-white p-10">
          <div className="mb-5 flex items-center space-x-2">
            <CheckCircleIcon className="h-10 text-green-500" />
            <h1 className="text-3xl">
              Thank you, your order has been confirmed
            </h1>
          </div>
          <p>
            Thank you for shopping with us , we'll send a collection on item has
            shipped , if you would like to check the status of order(s) please
            press the link below
          </p>
          <button
            onClick={() => router.push('/orders')}
            className="button mt-8"
          >
            Go to my orders
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Success
