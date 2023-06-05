import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    // if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    //     document.documentElement.classList.add('dark');
    // } else {
    //     document.documentElement.classList.remove('dark')
    // }
  return (
    <Html>
      <Head>
        {/* <link
          href="/favicon/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicon/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicon/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/favicon/site.webmanifest" rel="manifest" />
        <link
          color="#000000"
          href="/favicon/safari-pinned-tab.svg"
          rel="mask-icon"
        />
        <link href="/favicon/favicon.ico" rel="shortcut icon" /> */}
        
      </Head>
      <body className="overflow-y-scroll bg-gray-1100 ">
        <Main />
        
        <NextScript />
      </body>
    </Html>
  );
}
