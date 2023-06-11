'use client'
import { content } from '#/pages/api/content';
import Link from 'next/link';
import amqp, { Message } from "amqplib/callback_api";
import client, {Connection, Channel, ConsumeMessage} from 'amqplib'

import Script from 'next/script';
import { GetServerSideProps } from 'next';
import { host } from '#/constants';
import { Suspense, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// export const getStaticPaths: GetStaticPaths = async () => {
//   // ...




export default async function Page() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(false)
  // amqp.connect('amqp://guest:guest@localhost:5672', function(error0, connection) {
  //   if (error0) {
  //     throw error0;
  //   }
  //   connection.createChannel(function(error1, channel) {
  //     if (error1) {
  //       throw error1;
  //     }  
  //     channel.consume("oki", function(msg) {
  //       if(msg!.content) {
  //           console.log(" [x] %s", msg!.content.toString());
  //         }
  //     },
  //       {
  //       noAck: true
  //     });
  //   });
  // });
  useEffect(() => {
    setLoading(true);
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
  }, []);


  const firebaseConfig = {
    apiKey: "AIzaSyDAf98ET4naiHNKMgn1o059JB5YVk0RDQI",
    authDomain: "studionest-bc9f5.firebaseapp.com",
    projectId: "studionest-bc9f5",
    storageBucket: "studionest-bc9f5.appspot.com",
    messagingSenderId: "897754948672",
    appId: "1:897754948672:web:363c9c4e2746b0f5e2aba5",
    measurementId: "G-6BTJVFDEYK"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  let analytics;
  if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
  console.log(analytics)
  // console.log(analytics)

  if(loading) {
    return <div className='flex justify-center'><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-gray-50"></div></div>
  }
  return (
    <div className="space-y-8">

      
    </div>
  );
}
