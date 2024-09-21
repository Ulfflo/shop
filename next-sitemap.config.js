module.exports = {
  siteUrl: "https://shop-swart-phi.vercel.app/", // Replace with your actual site URL
  generateRobotsTxt: true, // Generates a robots.txt file
  exclude: ["/product-sitemap.xml"], // Exclude product sitemap, since it's dynamic
  sitemapSize: 5000, // Optional, you can limit the number of URLs per sitemap
};
