import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://bo-tshield.vercel.app https://js.paystack.co", // unsafe-inline: Paystack checkout needs it; TODO Wave 4 upgrade to nonce
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://bo-tshield.vercel.app https://*.supabase.co https://api.paystack.co https://api.deepseek.com",
  "frame-src https://js.paystack.co https://standard.paystack.co https://bo-tshield.vercel.app",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: CSP },                 // Layer 12
          { key: "X-Content-Type-Options", value: "nosniff" },            // Layer 12
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
    ];
  },
};
export default nextConfig;
