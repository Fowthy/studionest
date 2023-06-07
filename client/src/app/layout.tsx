'use client'

import './globals.css'
import { CookiesProvider, useCookies } from 'react-cookie';
import { ThemeProvider } from "next-themes"
import Layout from '#/ui/web/Layout'
import Head from 'next/head';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [cookies, setCookie, removeCookie] = useCookies(['studionest_user','studionest_user_token']);
  console.log(cookies, 'cookies')
  console.log('uuuu assaas')
  return (
    
      <html lang="en" className="[color-scheme:dark]">
      <Head>
        <title>StudioNest</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>            <body>
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
