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
import withAuth from '#/lib/withAuth';


// export const getStaticPaths: GetStaticPaths = async () => {
//   // ...




 function Page() {
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
    return <p>Loading...</p>
  }
  return (
    <div className="space-y-8">

      <h1 className="text-xl font-medium text-gray-300">StudioNest Settings</h1>
            <button id="theme-toggle" type="button" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                <svg id="theme-toggle-dark-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                <svg id="theme-toggle-light-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </button>

      <div className="space-y-10 text-white">
      <Suspense fallback={<p>Loading feed...</p>}>
            {data && (data as any).map((section: any) =>  (
                <div key={section.name} className="space-y-5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {section.name}
                    </div>

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {section.items.map((item: any) => {
                        return (
                        <Link
                            href={`/admin/${item.slug}`}
                            key={item.name}
                            className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
                        >
                            <div className="font-medium text-gray-200 group-hover:text-gray-50">
                            {item.name}
                            </div>

                            {item.description ? (
                            <div className="text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300">
                                {item.description}
                            </div>
                            ) : null}
                        </Link>
                        );
                    })}
                    </div>
                </div>
                ))}
                </Suspense>
      </div>
    </div>
  );
}

export default withAuth(Page);