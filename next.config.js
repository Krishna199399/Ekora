/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — generates pure HTML/CSS/JS files
  // Compatible with Hostinger shared hosting (public_html)
  output: 'export',

  // Adds trailing slash so /about/ works as about/index.html
  trailingSlash: true,

  reactStrictMode: true,
  images: {
    // Required for static export — next/image optimization needs a server
    unoptimized: true,
  },
};

module.exports = nextConfig;
