import "@/styles/globals.css";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import "react-datepicker/dist/react-datepicker.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <>
                <Component {...pageProps} />
                <Analytics />
                <SpeedInsights />
            </>
        </SessionProvider>
    );
}

export default MyApp;
