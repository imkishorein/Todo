import "@/styles/globals.css";
import { Analytics } from '@vercel/analytics/react';



export function MyApp({ Component, pageProps }) {
  return (
      <>
        <Component {...pageProps} />
        <Analytics />
      </>
  );
}

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
