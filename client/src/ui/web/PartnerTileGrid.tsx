
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import { Partner } from '~/types/partners'

export default function PartnerTileGrid({
  partnersByCategory,
  hideCategories = false,
}: {
  partnersByCategory: { [category: string]: any[] }
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
      {Object.keys(partnersByCategory).map((category, key) => (
        <div key={key} id={category.toLowerCase()} className="space-y-8 ">
          {!hideCategories && <h2 className="h2 text-xl text-gray-900 dark:text-gray-50">{category}</h2>}
          <div className="grid  gap-5 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg:max-w-none">
            {partnersByCategory[category].map((p, key) => (
              <div key={key}  onClick={() => Redirect(p._id)} >
           
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
                          {p.name}
                        </h3>
                        <p className="text-gray-900 dark:text-gray-50 text-sm text-scale-900">{p.desc}</p>
                      </div>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
