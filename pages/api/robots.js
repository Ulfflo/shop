// pages/api/robots.js
export default function handler(req, res) {
  const isProduction = process.env.NODE_ENV === "production";

  const sitemapUrl = "https://shop-swart-phi.vercel.app/sitemap"; // Justera URL:en till din sitemap

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
