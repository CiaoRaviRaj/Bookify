// /** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['links.papareact.com', 'fakestoreapi.com'],
  },
  env: {
    google_id: process.env.GOOGLE_ID,
    google_secret: process.env.GOOGLE_SECRET,
    stipe_public_key: process.env.STRIPE_PUBLIC_KEY,
    stipe_secret_key: process.env.STRIPE_SECRET_KEY,
    uplaod_js_public_key: process.env.UPLOAD_JS_PUBLIC_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    HOST: process.env.HOST,
    GITHUB_CLIENT_KEY: process.env.GITHUB_CLIENT_KEY,
    GITHUB_SECRET_KEY: process.env.GITHUB_SECRET_KEY,
  },
}
