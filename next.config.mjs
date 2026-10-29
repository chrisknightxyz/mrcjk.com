/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // The services page is the homepage; keep old /services links working.
    return [
      { source: "/services", destination: "/", permanent: true },
      // The start flow is a modal on the homepage; the query (need, services) carries over.
      { source: "/start", destination: "/?start=1", permanent: false },
    ];
  },
};

export default nextConfig;
