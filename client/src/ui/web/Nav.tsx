import Image from 'next/image'
import Link from 'next/link'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Nav = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['studionest_user','studionest_user_token']);
  const [userMenu, setUserMenu] = useState("hidden")
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  const Logout = () => {
    removeCookie('studionest_user')
    removeCookie('studionest_user_token')
  }
  const toggleUserMenu = (e: any) => {
    if(userMenu == "hidden") {
      setUserMenu("")
    } else {
      setUserMenu("hidden")
    }
  }

  useEffect(() => {
    fetch("/api/auth/user", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.studionest_user_token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(cookies,'hm',data)
        if (data.detail === 'Invalid ID token') {
        } else {
          setAuthenticated(true);
        }
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err, 'errrr');
        setLoading(false);
        setAuthenticated(false);

      });
    }, [cookies.studionest_user_token]);
      
    console.log(authenticated, 'authenticated')
    if(loading) {
      return <div></div>;
    }
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 relative">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">StudioNest</span>
      </a>
      <div className="flex items-center md:order-2">
        {authenticated ? (
          <>
            <button type="button" onClick={toggleUserMenu} className="flex md:visible mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
              <span className="sr-only">Open user menu</span>
              <Image width={40} height={40} className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"/>
            </button>
            <div className={`${userMenu} absolute top-10 right-5 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown`}>
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">Yes</span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Your Profile</a>
                </li>
                <li>
                  <a href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Admin Console</a>
                </li>
                <li onClick={Logout}>
                  <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                </li>
              </ul>
            </div>
            <button data-collapse-toggle="mobile-menu-2" onClick={toggleUserMenu} type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
          </>
        ) : (
          <Link href="/auth">
            Login
          </Link>
        )}
      </div>
      <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
             
            
        </ul>
      </div>
      </div>
    </nav>
  )
}

export default Nav
