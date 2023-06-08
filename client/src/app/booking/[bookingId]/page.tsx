'use client';

import { ModernAlert } from "#/ui/alerts/modern-alert";
import { Button } from "#/ui/buttons/button";
import { Spinner } from "#/ui/spinner";
import Layout from "#/ui/web/Layout";
import SectionContainer from "#/ui/web/SectionContainer";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import Image from 'next/image'
import { RoomClass, BacklineClass, BookingClass } from "#/types";
import { useCookies } from "react-cookie";
import PartnerTileGrid from "#/ui/web/PartnerTileGrid";
import BacklineTileGrid from "#/ui/web/BacklineTileGrid";
import { useUser } from "#/lib/useUser";
// import useSWR from 'swr'


// const fetcher = (...args: any) => 


export default function Page({params}: any) {
  console.log(params, 'params')
  
  const handleSubmit = (values: any) => {
    console.log(values, 'values')
  }
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<BookingClass>()
  const [roomData, setRoomData] = useState<RoomClass>()
  const [cookies, setCookie, removeCookie] = useCookies(['studionest_user','studionest_user_token']);
  const [authenticated, setAuthenticated] = useState(false);
  const [quantity, setQuantity] = useState<Record<string, number>>({});
  const user = useUser();

  const router = useRouter();

  // const { data, error, isLoading } = useSWR('/api/user', fetcher)

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/auth/user", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.studionest_user_token}`
          }
        });
        const data = await response.json();
  
        console.log(cookies, 'hm', data);
  
        if (data.detail === 'Invalid ID token') {
          // Handle invalid ID token case
        } else {
          setAuthenticated(true);
  
          const bookingResponse = await fetch(`/api/booking/id`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'booking-id': params.bookingId,
            }
          });
          const bookingData = await bookingResponse.json();
          setData(bookingData);
  
          if (bookingData) {
            const roomResponse = await fetch(`/api/admin/rooms/room`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'room-id': bookingData.roomId,
              }
            });
            const roomData = await roomResponse.json();
            setRoomData(roomData);
          }
  
          setLoading(false);
        }
      } catch (error) {
        console.log(error, 'errrr');
        setLoading(false);
        setAuthenticated(false);
      }
    };
  
    fetchData();
  }, [params.bookingId, cookies, cookies.studionest_user_token, params.roomId]);
      console.log('biggest test ever', data, roomData)
    if(loading || data == undefined || roomData == undefined ) {
      return <p>Loading..</p>
    }
    console.log(data,' test data tetete')
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
                <Image alt="neshto" src={roomData.img} width={1000} height={1000}/>
                <h1 className="h1 max-h-48 mt-2" style={{ marginBottom: 0 }}>
                  {roomData.name}
                </h1>
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
                    Backline
                  </h2>
                  <BacklineTileGrid backlines={data.backline} authenticated={authenticated} quantity={quantity} setQuantity={setQuantity}/>
                </div>

                <div>
                  <h2
                    className="text-scale-1200"
                    style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                    Details
                  </h2>
                  <div className="divide-y text-scale-1200">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-scale-900">Room</span>
                      <span className="text-scale-1200">{roomData?.name}</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <span className="text-scale-900">Duration</span>
                      <Link
                        href={`/partners/`}
                      >
                          {data.duration}
                      </Link>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <span className="text-scale-900">Date From</span>
                        <span className="flex items-center space-x-1">
                          <span>{data.dateFrom}</span>
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-scale-900">Date To</span>
                        <span className="flex items-center space-x-1">
                          <span>{data.dateTo}</span>
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-scale-900">In total</span>
                        <span className="flex items-center space-x-1">
                          <span>{data.totalPrice} EUR</span>
                        </span>
                    </div>
                  
                  </div>
                </div>
              </div>
            </div>
          </SectionContainer>
        </div>
    )
}