'use client'
import withAuth from '#/lib/withAuth';
import { useUser } from '#/lib/useUser';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import SectionContainer from '#/ui/web/SectionContainer';
import Link from 'next/link';
import Image from 'next/image'
import {UserClass, BookingClass} from '#/types';
import BookingTileGrid from '#/ui/web/BookingTileGrid';
function Page()  {
  const { user, logout } = useUser();
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<UserClass>()
  const [bookings, setBookings] = useState<BookingClass[]>([])
  const [cookies, setCookie] = useCookies(['studionest_user_token']);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
  
      try {
        const response = await fetch("/api/auth/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${cookies.studionest_user_token}`
          }
        });
        const data = await response.json();
        setData(data);
  
        if (data) {
          const bookingResponse = await fetch(`/api/booking/uid`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'uid': data.uid
            }
          });
          const bookingsData = await bookingResponse.json();
          setBookings(bookingsData);
        }
  
        setLoading(false);
      } catch (error) {
        console.log(error, 'errrr');
        setLoading(false);
      }
    };
  
    fetchData();
  }, [cookies.studionest_user_token]);

  if(loading || !data) return <div>Loading...</div>

  console.log(bookings, 'bookingsssss')
  return (
    <div>
          <SectionContainer>
            <div className="col-span-12 mx-auto mb-2 max-w-3xl space-y-12 lg:col-span-2 bg-gray-900 p-8 border-rounded rounded-xl">
              {/* Back button */}
              <Link
                href={`/partners/`}
              >
              
              </Link>

              <div className="flex items-center flex-col rounded-full">
                <Image alt="neshto" className="rounded-full h-72 w-72" src={"https://amplify-amplify7ba61ed5c67b4-staging-234108-deployment.s3.amazonaws.com/648248915f6c1b63152b7a6a-de63554f-b252-4b91-95d6-f62a1a417744.jpg"} width={1000} height={1000}/>
               
              </div>

              <div
                className="bg-scale-300 py-6"
                style={{
                  marginLeft: 'calc(50% - 50vw)',
                  marginRight: 'calc(50% - 50vw)',
                }}
              >
              </div>

              <div className="grid gap-3 space-y-16 lg:grid-cols-4 lg:space-y-0">
              <div className="lg:col-span-3">
                  <h2
                    className="text-scale-1200"
                    style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                    Past Bookings
                  </h2>
                  <div className='booking-container max-h-60 overflow-y-auto'>
                 <BookingTileGrid bookings={bookings}/>
                  </div>
                </div>
                <div className='flex flex-col justify-between'>
                  <div className="divide-y text-scale-1200">
                    <h2
                      className="text-scale-1200"
                      style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                      Details
                    </h2>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-scale-900">Name</span>
                      <span className="text-scale-1200">{data.name}</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                          {data.email}
                    </div>
                  
                  </div>
                    <div className="flex items-center justify-between p-0">
                         <button className='delete-profile focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
                            Delete profile
                         </button>
                    </div>
                </div>
              </div>
            </div>
          </SectionContainer>
        </div>
  )
}

export default withAuth(Page)