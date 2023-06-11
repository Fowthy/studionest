'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import BecomeAPartner from '#/ui/web/BecomeAPartner'
import PartnerLinkBox from '#/ui/web/PartnerLinkBox'
import PartnerTileGrid from '#/ui/web/PartnerTileGrid'
import SectionContainer from '#/ui/web/SectionContainer'
import Message from '#/ui/message'

export type RoomClass = {
  _id: string;
  name: string;
  desc: string;
  location: string;
  owner: string;
  owner_uid: string;
  type: string;
  backline:[]
};

function Page() {

  let messages = [{
    text: 'Find an Integration',
  },
  {
    text: 'Use your favorite tools with Supabase.',
  }, 
  {
    text: 'Find an Integration',
  },
  {
    text: 'Use your favorite tools with Supabase.',
  }]

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<RoomClass[]>([])
  const router = useRouter()
  const [chatOpened, setChatOpened] = useState(false)
  const [chatValue, setChatValue] = useState('')
  const [chatMessages, setChatMessages] = useState(messages)
  const [chatLoading, setChatLoading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true);
    fetch("/api/admin/rooms/rooms")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  
  
  
  if(loading) return <div className='flex justify-center align-middle h-screen'><div className="animate-spin self-center rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-gray-50"></div></div>
  
  const allCategories = Array.from(
    new Set(data.map((p) => p.type))
  )
  const filteredData = data.filter((item: RoomClass) => 
  item.name.toLowerCase().includes(search.toLowerCase())
);
  const partnersByCategory: { [category: string]: RoomClass[] } = {}
  filteredData.forEach(
    (p) =>
      (partnersByCategory[p.type] = [
        ...(partnersByCategory[p.type] ?? []),
        p,
      ])
  )
  let selectCategory = (category: any) => {
    router.push(`#${category.toLowerCase()}`)
  }


  const meta_title = 'Find an Integration'
  const meta_description = `Use your favorite tools with Supabase.`

  // const [debouncedSearchTerm] = useDebounce(search, 300)
  // const [isSearching, setIsSearching] = useState(false)
  // const currentTheme = theme === 'system' ? systemTheme : theme;

  // useEffect(() => {
  //   const searchPartners = async () => {
      // setIsSearching(true)

      // let query = supabase
      //   .from<Partner>('partners')
      //   .select('*')
      //   .eq('approved', true)
      //   .order('category')
      //   .order('title')

      // if (search.trim()) {
      //   query = query
      //     // @ts-ignore
      //     .textSearch('tsv', `${search.trim()}`, {
      //       type: 'websearch',
      //       config: 'english',
      //     })
      // }

      // const { data: partners } = await query

      // return partners
    // }

    // if (search.trim() === '') {
    //   setIsSearching(false)
    //   setPartners(initialPartners)
    //   return
    // }

    // searchPartners().then((partners) => {
    //   if (partners) {
    //     setPartners(partners)
    //   }

  //     setIsSearching(false)
  //   })
  // }, [debouncedSearchTerm, router])



  let openChat = () => {
    console.log('open chat')
    if(chatOpened) {
      setChatOpened(false)
    } else {
      setChatOpened(true)
    }
  }
  async function sendMessage()  {
    console.log('send message')
    let msg = chatValue;
    let body = {
      text: msg,
      sender: 'user'
    }
    messages.push(body)
    setChatMessages(messages)
    setChatValue('')
    setChatLoading(true)

    await fetch('/api/ai/chatbot', {
      method: 'POST',
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      let response_body = {
        text: data,
        sender: 'bot'
      }
      messages.push(response_body)
      setChatMessages(messages)
      setChatValue('')
      setChatLoading(false)
    })
  }
  console.log(chatMessages, 'chat ssssss')


  return (
    <>
      {/* <Head>
        <title>StudioNest</title>
        <meta name="description" content={"e"}></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
        <SectionContainer className="space-y-16">
          <div>
            <h1 className="h1 text-2xl text-gray-900 dark:text-gray-50">{"StudioNest"}</h1>
            <h2 className="text-xl text-scale-900 text-gray-900 dark:text-gray-50">{"Rehearsal rooms and studios for rent"}</h2>
          </div>
          {/* Title */}
          <div className="grid space-y-12 md:gap-8 lg:grid-cols-12 lg:gap-16 lg:space-y-0 xl:gap-16">
            <div className="lg:col-span-4 xl:col-span-3">
              {/* Horizontal link menu */}
              <div className="space-y-6">
                {/* Search Bar */}

                <input
                  // icon={<IconSearch />}
                  placeholder="Search..."
                  type="text"
                  className="bg-gray-50 border-none text-gray-900 dark:text-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={search}
                  onChange={(e: any) => setSearch(e.target.value)}

                />
                
                <div className="hidden lg:block">
                  <div className="mb-2 text-lg text-gray-900 dark:text-gray-50 font-bold">Categories</div>
                 
                  <div className="space-y-1">
                    {allCategories.map((category) => (
                      <button
                        key={category}
                        onClick={(category) => selectCategory(category)}
                        
                        className="block text-base text-scale-1100 text-gray-50 bg-gray-400 pl-4 pr-4 pt-1 pb-1 border-none rounded-lg dark:bg-gray-900 dark:text-gray-50"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="mb-2 text-sm text-scale-900 text-gray-900 dark:text-gray-50">
                    Explore more
                  </div>
                  <div className="grid grid-cols-2 gap-8 lg:grid-cols-1">
                    <PartnerLinkBox
                      title="Become a partner"
                      color="blue"
                      description="Register as an organization to list for rent your rehearsal rooms and studios."
                      href={`/`}
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      }
                    />

                    <PartnerLinkBox
                      href={`/`}
                      title="Contact us"
                      color="brand"
                      description="Any questions? Please contact us."
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      }   
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 xl:col-span-9">
              {/* Partner Tiles */}
              <div className="grid space-y-10">
                {loading == false && filteredData.length ? (
                  <PartnerTileGrid partnersByCategory={partnersByCategory} />
                ) : (
                  <h2 className="h2">No partners found</h2>
                )}
              </div>
            </div>
            <div className='open-chat animate-pulse cursor-pointer bg-gray-300 rounded-full bottom-5 right-1 absolute w-10 h-10' onClick={openChat}>
              
            </div>
            <ul className={`space-y-12 bg-gray-700 rounded-md p-4 absolute max-w-md min-w-md bottom-11 right-7 grid grid-cols-1 transition-all ${chatOpened ? '' : 'hidden'}`}>
                      {chatMessages?.map((message, i) => 
                        <Message key={i}  message={message} loading={chatLoading}/>
                        )}
                        {chatLoading && <div className='flex justify-start text-gray-100 text-sm'>Typing...</div>}
                        <div className='input-box flex justify-between'>
                          <input type="text" value={chatValue} className='bg-gray-600 text-gray-100 rounded-md w-full' onChange={(e: any) => setChatValue(e.target.value)}/>
                          <button className='bg-gray-400 p-3 ml-2 text-gray-50 rounded-md' onClick={sendMessage}>Send</button>
                        </div>
                    </ul>
          </div>
        </SectionContainer>
    </>
  )
}

export default Page
