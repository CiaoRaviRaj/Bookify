import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Footer() {
  const router = useRouter()
  return (
    <div className="static bottom-0 w-full overflow-hidden">
      <div className="bg-amazon_blue-light md:px-5 lg:px-10">
        <div className="flex flex-col flex-wrap items-center justify-center space-x-6 space-y-5 pb-8 pt-4 text-white sm:flex-row sm:items-baseline md:space-x-10 lg:space-x-12 xl:space-x-24">
          <div className="ml-3">
            <h1 className="mb-2 text-xl font-bold">GET TO KNOW US</h1>
            <ul className="font-semibold">
              <li className="link">About Us</li>
              <li className="link">Careers</li>
              <li className="link">Press Release</li>
              <li className="link">Bookify Cares</li>
              <li className="link">Gift a Smile</li>
            </ul>
          </div>
          <div>
            <h1 className="mb-2 text-xl font-bold">CONNECT WITH US</h1>
            <ul className="font-semibold">
              <li className="link">Facebook</li>
              <li className="link">Twitter</li>
              <li className="link">Instagram</li>
            </ul>
          </div>

          <div className="hidden lg:flex lg:flex-col">
            <h1 className="mb-2 text-xl font-bold">MAKE MONEY WITH US</h1>
            <ul className="font-semibold">
              <li className="link">Sell On Bookify</li>
              <li className="link">Bookify Global Selling</li>
              <li className="link">Become an Affiliate</li>
              <li className="link">Fulfilment by Bookify</li>
              <li className="link">Advertise Your Products</li>
              <li className="link">Bookify Pay on Merchants</li>
            </ul>
          </div>
          <div>
            <h1 className="mb-2 text-xl font-bold ">LET US HELP YOU</h1>
            <ul className="font-semibold">
              <li className="link">Your Account</li>
              <li className="link">Returns Center</li>
              <li className="link">100% Purchase Protection</li>
              <li className="link">Help</li>
              <li className="link">Bookify App Download</li>
            </ul>
          </div>
        </div>
      </div>
      <div
        onClick={() => router.push('/')}
        className="flex flex-grow items-center justify-evenly border-t border-gray-600 bg-amazon_blue pt-4 font-semibold text-white"
      >
        <div className="flex items-center rounded-xl bg-gray-100 p-2 shadow-xl">
          <Image
            src="/logo.png"
            alt="Amazon"
            width={140}
            height={30}
            objectFit="cover"
            className="flex-shrink cursor-pointer"
          />
          <span className="flex-grow  text-2xl font-bold text-black">
            Bookify
          </span>
        </div>

        <h1 className="-mt-1 text-xl md:text-2xl">© CiaoRaviRaj</h1>
      </div>
      {/*
      <p className="flex flex-grow justify-evenly border-t border-gray-600 bg-amazon_blue p-2 text-center font-semibold text-white">
        Note : This has been made only for educational purposes. No copyright
        intended.
      </p> 
      */}
    </div>
  )
}

export default Footer
