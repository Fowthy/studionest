'use client'
import withAuth from '#/lib/withAuth';
import { useUser } from '#/lib/useUser';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import SectionContainer from '#/ui/web/SectionContainer';
import Link from 'next/link';
import Image from 'next/image'
import {UserClass, BookingClass} from '#/types';
function Page()  {
  const { user, logout } = useUser();
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<UserClass>()
  const [bookings, setBookings] = useState<BookingClass[]>([])
  const [cookies, setCookie] = useCookies(['studionest_user_token']);

  useEffect(() => {
    setLoading(true);
    fetch("/api/auth/user", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${cookies.studionest_user_token}}`
      }
    }
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      }).then(() => {
        if(!data) return
        fetch(`/api/booking/uid`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'uid': data.uid
          }
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, 'data')
            setBookings(data)
            setLoading(false);
          } 
          )
      })

  }, [cookies.studionest_user_token]);

  if(loading || !data) return <div>Loading...</div>

  console.log(data)
  return (
    <div>
          <SectionContainer>
            <div className="col-span-12 mx-auto mb-2 max-w-3xl space-y-12 lg:col-span-2 bg-gray-900 p-8 border-rounded rounded-xl">
              {/* Back button */}
              <Link
                href={`/partners/`}
              >
              
              </Link>

              <div className="flex items-center flex-col">
                {/* <Image alt="neshto" src={roomData.img} width={1000} height={1000}/> */}
               
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
                  {bookings.map((booking) => (
                   <div><p>{booking.dateFrom}</p><p>{booking.totalPrice}</p></div>
                  ))}
                </div>
                <div>
                  <h2
                    className="text-scale-1200"
                    style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                    Details
                  </h2>
                  <div className="divide-y text-scale-1200">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-scale-900">Name</span>
                      <span className="text-scale-1200">{data.name}</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <span className="text-scale-900">Email</span>
                      <Link
                        href={`/partners/`}
                      >
                          {data.email}
                      </Link>
                    </div>
                  
                  </div>
                </div>
              </div>
            </div>
          </SectionContainer>
        </div>
  )
}

export default withAuth(Page)