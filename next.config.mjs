/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The start flow is a modal on the homepage; the query (need, services) carries over.
      { source: "/start", destination: "/?start=1", permanent: false },
    ];
  },
};

export default nextConfig;
