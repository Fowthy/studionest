
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import { Partner } from '~/types/partners'
import { BacklineClass } from '#/types'
import { useState } from 'react'

export default function BacklineTileGrid({
  backlines,
  authenticated = false,
  hideCategories = false,
  quantity, 
  setQuantity
}: {
  backlines: BacklineClass[]
  authenticated: boolean,
  hideCategories?: boolean,
  quantity: Record<string, number>,
  setQuantity: React.Dispatch<React.SetStateAction<Record<string, number>>>
}) {
  let router = useRouter()
  const updateQuantity = (categoryId: any, newValue: any) => {
    setQuantity({...quantity, [categoryId]: newValue});
  };

  const Redirect = (e: any) => {
    // e.preventDefault();
    router.push(`/rooms/${e}`);
    
    // router.back();
    // get rooms from http://localhost:8080/api/roomman/room/{id}
    // let data = fetch(`http://localhost:8080/api/roomman/room/${e}`)
    
  };
  const incrementQuantity = (id: any) => {
    setQuantity((prevQuantity) => ({...prevQuantity, [id]: (prevQuantity[id] || 0) + 1}))
        console.log(id, 'a')
        console.log(quantity, 'b')
  }

  const decrementQuantity = (id: any) => {
    setQuantity((prevQuantity: any) => ({...prevQuantity, [id]: (prevQuantity[id] || 0) - 1}))
  }
  return (
    <>
      {backlines.map((category, key) => (
        <div key={key} id={category.name.toLowerCase()} className="space-y-8 backline-list max-h-96 overflow-y-auto">
              <div >
           
                  <div
                    className='border-rounded border-none group block space-y-1.5 rounded-lg text-gray-900 bg-slate-100 dark:bg-gray-900 px-5 py-3 dark:hover:bg-gray-800'>
                    <div className="flex w-full space-x-6">
                      <div className="w-14 h-14 transition-all scale-100 group-hover:scale-110">
                        {category.img && (
                        <Image
                          width={100}
                          height={100}
                          className="w-14 h-14 bg-gray-300 rounded-full"
                          src={category.img}
                          alt={"Backline img"}
                        />)}
                      </div>
                      <div>
                        <h3 className="text-gray-900 dark:text-gray-50 transition-colors text-xl text-scale-1100 group-hover:text-scale-1200 mb-2">
                          {category.name}
                        </h3>
                        <p className="text-gray-900 dark:text-gray-50 text-sm text-scale-900">{category.desc} | Price: {category.price}$</p>
                      </div>
                    </div>
                    {authenticated && (
                    <div className="custom-number-input w-32">
                      <label htmlFor="custom-input-number" className="w-full text-gray-700 text-sm font-semibold">Counter Input
                      </label>
                      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                        <button data-action="decrement" onClick={() => decrementQuantity(category._id)} className=" bg-gray-300 dark:bg-gray-600 dark:text-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                          <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input type="number" value={quantity[category._id] || 0} readOnly className="outline-none border-transparent focus:border-transparent focus:ring-0 focus:outline-none text-center w-full bg-gray-300 dark:bg-gray-700 dark:text-gray-100 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number"></input>
                      <button data-action="increment" onClick={() => incrementQuantity(category._id)} className="bg-gray-300 dark:bg-gray-600 dark:text-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                        <span className="m-auto text-2xl font-thin">+</span>
                      </button>
                      </div>
                    </div>)}
                      
                  </div>
              </div>
        </div>
      ))}
    </>
  )
}
