

import "./globals.css";

import ClientLayout from "./components/ClientLayout";



// Export metadata for SEO and social sharing
export const metadata = {
  title: "The Frog Store - Home",
  description: "Welcome to the best store online!",
  openGraph: {
    title: "The Frog Store - Home",
    description: "Browse a wide variety of products at amazing prices!",
    url: "https://shop-swart-phi.vercel.app/",
    images: [
      {
        url: "https://shop-swart-phi.vercel.app/images/groda.jpg", // Link to your image
        width: 1200,
        height: 630,
        alt: "Frog with sunglasses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Frog Store - Home",
    description: "Shop for the best products online!",
    images: ["https://shop-swart-phi.vercel.app/images/groda.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
          <ClientLayout>{children}</ClientLayout>
          
      
      </body>
    </html>
  );
}
