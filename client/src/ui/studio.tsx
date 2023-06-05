"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";


export const Studio = ({
  id,
  name,
  description,
  redirect = false,
}: {
    id: string;
  name: string;
  description?: string;
  redirect?: boolean;
}) => {
    const router = useRouter();
    const pathname = usePathname();

    const Redirect = (e: any) => {
        console.log(id,name,description,e,pathname)
        // e.preventDefault();
        router.push(`${pathname}/${e}`);
        
        // router.back();
        // get rooms from http://localhost:8080/api/roomman/room/{id}
        // let data = fetch(`http://localhost:8080/api/roomman/room/${e}`)
        
      };
  return (
<div key={id} className="bg-dark dark border border-dark-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              {/* <Image
                className="rounded-t-lg m-0"
                src="https://staticc.sportskeeda.com/editor/2023/03/74239-16802021050837-1920.jpg?w=840"
                alt=""
                width={'100'}
                height={'100'}
              /> */}
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {name}
                </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {description}
              </p>
              <a
                onClick={() => redirect && Redirect(id)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
            );
        }
        