/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
      },
    ]
  },
  images: {
    domains: [
      "yuuycvinigzcifepaqra.supabase.co",
      "i.scdn.co",
      "wrapped-images.spotifycdn.com",
      "mosaic.scdn.co",
      "lineup-images.scdn.co",
      "newjams-images.scdn.co",
      "images-ak.spotifycdn.com",
      "scontent-ams2-1.xx.fbcdn.net"
    ],
  },
};

module.exports = nextConfig;
