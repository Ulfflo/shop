
export default function handler(req, res) {
  const isProduction = process.env.NODE_ENV === "production";

  const sitemapUrl = "https://shop-swart-phi.vercel.app/api/sitemap"; 

  const robotsTxt = isProduction
    ? `User-agent: *
Disallow: /api/
Sitemap: ${sitemapUrl}`
    : `User-agent: *
Disallow: /`;

  res.setHeader("Content-Type", "text/plain");
  res.write(robotsTxt);
  res.end();
}
