'use client'

import './globals.css'
import { CookiesProvider, useCookies } from 'react-cookie';
import { ThemeProvider } from "next-themes"
import Layout from '#/ui/web/Layout'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [cookies, setCookie, removeCookie] = useCookies(['studionest_user','studionest_user_token']);
  console.log(cookies, 'cookies')
  console.log('uuuu wawu')
  return (
    
    
      <html lang="en" className="[color-scheme:dark]">
      <head />
            <body>
            <CookiesProvider>
                <ThemeProvider attribute="class">
                  <Layout>
                    {children}
                  </Layout>
                </ThemeProvider>
              </CookiesProvider>
            </body>
      </html>

  )
}
