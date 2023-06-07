
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import { Partner } from '~/types/partners'
import { BacklineClass } from '#/types'

export default function BacklineTileGrid({
  backlines,
  authenticated = false,
  hideCategories = false,
}: {
  backlines: BacklineClass[]
  authenticated: boolean,
  hideCategories?: boolean
}) {
  let router = useRouter()

  const Redirect = (e: any) => {
    // e.preventDefault();
    router.push(`/rooms/${e}`);
    
    // router.back();
    // get rooms from http://localhost:8080/api/roomman/room/{id}
    // let data = fetch(`http://localhost:8080/api/roomman/room/${e}`)
    
  };
  return (
    <>
      {backlines.map((category, key) => (
        <div key={key} id={category.name.toLowerCase()} className="space-y-8 backline-list max-h-96 overflow-y-auto">
              <div >
           
                  <div
                    className='border-rounded border-none group block space-y-1.5 rounded-lg text-gray-900 bg-slate-100 dark:bg-gray-900 px-5 py-3 dark:hover:bg-gray-800'>
                    <div className="flex w-full space-x-6">
                      <div className="w-15 h-15 transition-all scale-100 group-hover:scale-110">
                        <img
                          width={40}
                          height={40}
                          className="w-15 h-15 bg-gray-300 rounded-full"
                          src={"https://amplify-amplify7ba61ed5c67b4-staging-234108-deployment.s3.eu-north-1.amazonaws.com/IMG_5336.JPG"}
                          alt={"nz"}
                        />
                      </div>
                      <div>
                        <h3 className="text-gray-900 dark:text-gray-50 transition-colors text-xl text-scale-1100 group-hover:text-scale-1200 mb-2">
                          {category.name}
                        </h3>
                        <p className="text-gray-900 dark:text-gray-50 text-sm text-scale-900">{category.desc}</p>
                      </div>
                    </div>
                    {authenticated && (
                    <div className="custom-number-input w-32">
                      <label htmlFor="custom-input-number" className="w-full text-gray-700 text-sm font-semibold">Counter Input
                      </label>
                      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                        <button data-action="decrement" className=" bg-gray-300 dark:bg-gray-600 dark:text-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                          <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input type="number" className="outline-none border-transparent focus:border-transparent focus:ring-0 focus:outline-none text-center w-full bg-gray-300 dark:bg-gray-700 dark:text-gray-100 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value="0"></input>
                      <button data-action="increment" className="bg-gray-300 dark:bg-gray-600 dark:text-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
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
