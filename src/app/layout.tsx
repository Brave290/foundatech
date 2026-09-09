import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { siteConfig } from "@/config/site";
import "./globals.css";

/* Brand type system: serif = trust/foundation, sans = clarity, mono = techy details */
const fontDisplay = Source_Serif_4({ subsets: ["latin"], variable: "--font-display", weight: ["600", "700"] });
const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const fontMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.nameExpansion}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: ["software company Nigeria", "web development Lagos", "Founda Technologies"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export default function RootLayout({ children }: { children: Readonly<{ children: React.ReactNode }> }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} font-sans`}>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
