import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import { GoogleTagManager } from "@next/third-parties/google"; // Import the GoogleTagManager component

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
  return (
    <html lang="en">
      <head>{/* Head elements like metadata and title can go here */}</head>
      <body>
        <ClientLayout>{children}</ClientLayout>

        {/* Include the Google Tag Manager with your GTM ID */}
        <GoogleTagManager gtmId="GTM-KFD5SLDV" />
      </body>
    </html>
  );
}
