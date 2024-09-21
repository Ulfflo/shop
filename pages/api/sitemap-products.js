import { SitemapStream, streamToPromise } from "sitemap";

async function fetchAllProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
}

export default async function handler(req, res) {
  try {
    const products = await fetchAllProducts();

    const sitemapStream = new SitemapStream({
      hostname: "https://shop-swart-phi.vercel.app/",
    });

    // Add product URLs to the sitemap
    products.forEach((product) => {
      sitemapStream.write({
        url: `/product/${product.id}`,
        changefreq: "weekly",
        priority: 0.8,
      });
    });

    sitemapStream.end();

    const sitemapOutput = await streamToPromise(sitemapStream).then((data) =>
      data.toString()
    );

    res.setHeader("Content-Type", "application/xml");
    res.write(sitemapOutput);
    res.end();
  } catch (error) {
    res.status(500).end("Error generating sitemap");
  }
}
