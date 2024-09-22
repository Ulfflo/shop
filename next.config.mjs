export default {
  async redirects() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots", // Redirect to your API route
        permanent: true,
      },
    ];
  },
};
