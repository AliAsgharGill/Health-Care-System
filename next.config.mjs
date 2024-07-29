/** @type {import('next').NextConfig} */
const nextConfig = {
    // images   
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "t4.ftcdn.net",
            }
        ],
    },
};

export default nextConfig;
