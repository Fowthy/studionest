import { Layout } from '#/ui/layout';
import { Inter, Karla } from 'next/font/google';
import { AppProps } from 'next/app';
import 'src/app/globals.css';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import amqp from 'amqplib/callback_api';
import {useState, useEffect} from 'react';



// Using next/font instead of a manual setup, we get:
// - significantly easier setup
// - automatic best font practices
// - reduced layout shift
// - no network requests from the browser
// const primaryFont = Inter({
//   subsets: ['latin'],
//   variable: '--primary-font',
// });

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      arede: "asdasd"
    }
  }
}


export default function App({ Component, pageProps }: AppProps) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false)
  
  useEffect(() => {
      setLoading(true);
      fetch('/api/content').then((res) => res.json()).then((data) => {
          setData(data);
          setLoading(false);
      })
  },[])

  let content = '';
  return (
    <main className={`font-sans`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
