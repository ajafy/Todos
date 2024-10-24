/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        trustedHosts: [
            "localhost",
            "127.0.0.1",
        ],
    },
};