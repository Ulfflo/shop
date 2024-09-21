import { SitemapStream, streamToPromise } from "sitemap";

export default async function handler(req, res) {
  const sitemapStream = new SitemapStream({
    hostname: "https://shop-swart-phi.vercel.app/",
  });

  // Add static routes
  sitemapStream.write({
    url: "/",
    changefreq: "daily",
    priority: 1.0,
  });

  // Add dynamic product sitemap URL
  sitemapStream.write({
    url: "/api/sitemap-products",
    changefreq: "daily",
    priority: 0.8,
  });

  sitemapStream.end();

  const sitemapOutput = await streamToPromise(sitemapStream).then((data) =>
    data.toString()
  );

  res.setHeader("Content-Type", "application/xml");
  res.write(sitemapOutput);
  res.end();
}
