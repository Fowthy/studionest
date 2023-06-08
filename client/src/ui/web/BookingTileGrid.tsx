
import { useRouter } from 'next/navigation'


export default function BookingTileGrid({
  bookings,
}: {
  bookings: any[]
}) {
  let router = useRouter()

  const Redirect = (e: any) => {
    router.push(`/booking/${e}`);
    
    
  };
  return (
    <>
      {bookings.length > 0 ? bookings.map((category, key) => (
        <div key={key} onClick={() => Redirect(category._id)} id={`booking_room_${category.roomId}`} className="space-y-8 mb-2 backline-list max-h-96 overflow-y-auto cursor-pointer">
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
