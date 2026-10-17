/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Decap CMS lives in public/admin; serve it at /admin.
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
};

export default nextConfig;
