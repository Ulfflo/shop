// next.config.js
export default {
  async redirects() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
        permanent: true,
      },
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
        permanent: true,
      },
    ];
  },
};
