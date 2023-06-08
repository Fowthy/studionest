
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import { Partner } from '~/types/partners'
import { BacklineClass } from '#/types'
import { useState } from 'react'

export default function BookingTileGrid({
  bookings,
  hideCategories = false,
}: {
  bookings: any[]
  hideCategories?: boolean,
}) {
  let router = useRouter()

  const Redirect = (e: any) => {
    // e.preventDefault();
    router.push(`/booking/${e}`);
    
    // router.back();
    // get rooms from http://localhost:8080/api/roomman/room/{id}
    // let data = fetch(`http://localhost:8080/api/roomman/room/${e}`)
    
  };
  return (
    <>
      {bookings.length > 0 ? bookings.map((category, key) => (
        <div key={key} id={`booking_room_${category.roomId}`} className="space-y-8 mb-2 backline-list max-h-96 overflow-y-auto cursor-pointer">
              <div >
           
                  <div
                    className='border-rounded border-none group block space-y-1.5 rounded-lg text-gray-900 bg-slate-100 dark:bg-gray-900 px-5 py-3 dark:hover:bg-gray-800'>
                    <div className="flex w-full space-x-6">

                      <div>
                        <h6 className="text-gray-900 dark:text-gray-50 transition-colors group-hover:text-scale-1200 mb-2">
                          {category.dateFrom} - {category.dateTo}
                        </h6>
                        <p className="text-gray-900 dark:text-gray-50 text-sm text-scale-900">Duration : {category.duration}</p>

                        <p className="text-gray-900 dark:text-gray-50 text-sm text-scale-900">{category.status} | Price: {category.totalPrice}$</p>
                      </div>
                    </div>
                  </div>
              </div>
        </div>
      )) : <p>No backline available for this room</p>}
    </>
  )
}
