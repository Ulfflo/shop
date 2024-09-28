import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import * as gtag from "../lib/gtag"; // Import gtag functions

// Export metadata for SEO and social sharing
export const metadata = {
  title: "The Frog Store",
  description: "Welcome to the best store online!",
  openGraph: {
    title: "The Frog Store",
    description: "Browse a wide variety of products at amazing prices!",
    url: "https://shop-swart-phi.vercel.app/",
    images: [
      {
        url: "https://shop-swart-phi.vercel.app/images/groda.jpg",
        width: 1200,
        height: 630,
        alt: "Frog with sunglasses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Frog Store",
    description: "Shop for the best products online!",
    images: ["https://shop-swart-phi.vercel.app/images/groda.jpg"],
  },
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route changes
  useEffect(() => {
    const url = pathname + searchParams.toString();
    gtag.pageview(url); // Send the current path to Google Analytics
  }, [pathname, searchParams]);

  return (
    <html lang="en">
      <head>
        {/* Add Google Analytics Script */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
