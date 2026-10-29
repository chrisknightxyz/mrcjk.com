/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Temporary until the homepage is rebuilt: mrcjk.com opens the services page.
    return [{ source: "/", destination: "/services", permanent: false }];
  },
};

export default nextConfig;
