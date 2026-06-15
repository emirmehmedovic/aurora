import type { Metadata } from "next";
import Script from "next/script";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aurorashop.ba"),
  title: "IPL Epilator za Kućnu Upotrebu | Trajno Uklanjanje Dlačica u BiH",
  description:
    "Kućni IPL epilator s ugrađenim hlađenjem za trajno uklanjanje dlačica. Besplatna dostava u BiH, plaćanje pouzećem i rezultati vidljivi već nakon 2 sedmice korištenja.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "IPL Epilator za Kućnu Upotrebu | Aurora Shop",
    description:
      "Kućni IPL epilator s ugrađenim hlađenjem. Besplatna dostava u BiH, plaćanje pouzećem i rezultati vidljivi već nakon 2 sedmice korištenja.",
    url: "https://aurorashop.ba",
    siteName: "Aurora Shop",
    locale: "bs_BA",
    type: "website",
    images: [
      {
        url: "/slike/PRO/cover-image.png",
        width: 1200,
        height: 630,
        alt: "Aurora Shop IPL epilator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPL Epilator za Kućnu Upotrebu | Aurora Shop",
    description:
      "Kućni IPL epilator s ugrađenim hlađenjem. Besplatna dostava u BiH, plaćanje pouzećem i rezultati vidljivi već nakon 2 sedmice korištenja.",
    images: ["/slike/PRO/cover-image.png"],
  },
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bs" className="force-light">
      <head>
        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

        {/* Meta Pixel */}
        {FB_PIXEL_ID && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}

        {/* Microsoft Clarity */}
        {CLARITY_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script","${CLARITY_ID}");
            `}
          </Script>
        )}

        {/* TikTok Pixel */}
        {TIKTOK_PIXEL_ID && (
          <Script id="tiktok-pixel" strategy="afterInteractive">
            {`
              !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
              ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
              ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};
              var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;
              var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('${TIKTOK_PIXEL_ID}');
              ttq.page();
            }(window,document,'ttq');
            `}
          </Script>
        )}
      </head>
      <body className="antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
