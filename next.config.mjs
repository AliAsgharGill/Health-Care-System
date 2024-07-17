/** @type {import('next').NextConfig} */
const nextConfig = {
    // images   
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
};

export default nextConfig;
