import Image from 'next/image'

import Link from 'next/link'
import Currency from 'react-currency-formatter'
import { useState } from 'react'
import React from 'react'
import {
  SearchIcon,
  ShoppingCartIcon,
  LoginIcon,
} from '@heroicons/react/outline'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'
import { useRouter } from 'next/router'
import { signIn, useSession, signOut } from 'next-auth/react'
import { selectItems } from '../slices/basketSlice'

function Header({ products }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showResults, setShowResults] = useState(false)
  const handleSearch = (e) => {
    let trem = e.target.value
    trem = trem.toLowerCase()
    setSearchTerm(trem)
  }

  if (searchTerm) {
    const searchInput = document.getElementById('searchinput')
    searchInput.classList.remove('rounded-l-lg')
    searchInput.classList.add('rounded-tl-lg')
  }

  const { data: session } = useSession()
  const router = useRouter()
  const items = useSelector(selectItems)

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Top Navbar */}
      <div className="ns:py-2 flex flex-grow items-center bg-amazon_blue p-1 outline-none ">
        {/* Logo */}
        <div
          onClick={() => router.push('/')}
          className=" flex-shrink-1 bg-amazon_blue-100 mt-2 mr-2 flex w-28 cursor-pointer items-center space-x-2 rounded-lg bg-white px-1 shadow-sm xs:w-32"
        >
          <Image
            src="/logo.png"
            alt="Amazon"
            width={150}
            height={80}
            objectFit="cover"
            className=" rounded-full"
          />
          <span className="glow-2  shadow-3 text-lg font-bold text-black">
            Bookify
          </span>
        </div>

        {/* Search Bar */}
        <div className=" relative flex h-10 flex-grow cursor-pointer items-center rounded-lg bg-blue-400 hover:bg-blue-500">
          <input
            onMouseEnter={() => setShowResults(true)}
            onBlur={() => setShowResults(false)}
            onFocus={() => setShowResults(true)}
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Grasp Your Demand.."
            className="h-full w-6 flex-grow rounded-l-lg p-2 px-5 focus:w-full focus:outline-none sm:flex-shrink"
            id="searchinput"
            type="text"
          />
          <SearchIcon className="h-12 w-14 p-3"></SearchIcon>

          {showResults && (
            <div
              onMouseEnter={() => setShowResults(true)}
              onMouseOver={() => setShowResults(true)}
              onMouseLeave={() => setShowResults(false)}
              className="absolute bottom-0 z-10 h-auto max-h-96 w-[95.45%] translate-y-full overflow-y-auto rounded-b-md bg-white"
            >
              {searchTerm && (
                <p className="py-2 text-center text-xs text-gray-400">
                  The Product You Are Searching For Does Not Exist
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Side Items */}
        <div className="mr-3 ml-1 flex items-center space-x-3 whitespace-nowrap text-xs text-white sm:ml-3 sm:space-x-6">
          {/* Name &  Account & Lists */}
          <div className="link hidden hover:block sm:block">
            <>
              {session ? (
                <div>
                  <p>Hello, {session.user.name}</p>
                  <p className="font-extrabold md:text-sm">
                    My Account & Lists
                  </p>
                </div>
              ) : (
                <div
                  className="-mr-2 flex items-center space-x-1 rounded-md border border-none p-1 text-center no-underline transition duration-150 ease-out hover:bg-gray-200 hover:text-amazon_blue hover:ease-in "
                  onClick={() => signIn()}
                >
                  <LoginIcon className="text-md h-8" />
                  <a className="text-lg font-semibold no-underline">Sign In</a>
                </div>
              )}
            </>
          </div>

          {/* Returns & My Order*/}
          <div
            className="link hidden md:block"
            onClick={() => router.push('/orders')}
          >
            <p>Returns & </p>
            <p className="font-extrabold md:text-sm">My Orders</p>
          </div>

          {/* Basket */}
          <div
            className="link relative flex items-center"
            onClick={() => router.push('/checkout')}
          >
            <span className="absolute top-0 right-0 h-4 w-4 animate-pulse rounded-full bg-yellow-400 text-center font-bold text-black md:right-10">
              {items.length}
            </span>
            <ShoppingCartIcon className="text-md h-10" />
            <p className="mt-2 hidden font-extrabold md:inline md:text-sm">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className=" flex items-center space-x-3 bg-amazon_blue-light p-2 pl-6 text-sm text-white outline-none">
        <div>
          <Navbar />
        </div>
        <p className="link" onClick={() => router.push('/referbished_books')}>
          Referbished Books
        </p>
        <p className="link" onClick={() => router.push('/u2u')}>
          Bookify U2U Sell
        </p>
        <p className="link">Today&#39;s Deals</p>
        <p className="link hidden lg:inline-flex">Fictions</p>
        <p className="link hidden lg:inline-flex">Love & comedy</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shoppers Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  )
}

export default Header
