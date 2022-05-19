/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/policies',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
