import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { JetBrains_Mono, Plus_Jakarta_Sans, Source_Serif_4, Syne } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LocaleProvider } from "@/components/site/locale-toggles";
import { VeilProvider } from "@/components/site/veil";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { BackToTop } from "@/components/site/back-to-top";
import { RouteVeil } from "@/components/site/route-veil";
import { CookieBanner } from "@/components/site/cookie-banner";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { FirstLoadVeil } from "@/components/site/first-load-veil";
import { HideOnAdmin } from "@/components/site/hide-on-admin";
import { AnalyticsBeacon } from "@/components/site/analytics-beacon";
import { FoundaLogo } from "@/components/brand/founda-logo";
import { siteConfig } from "@/config/site";
import "./globals.css";

const fontDisplay = Syne({ subsets: ["latin"], variable: "--font-display", weight: ["600", "700", "800"] });
const fontSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const fontMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const fontSerif = Source_Serif_4({ subsets: ["latin"], style: ["italic"], variable: "--font-serif", weight: ["500", "600"] });
const fontSerifDisplay = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif-display", weight: ["600", "700"] });

const hasLogoWebp = fs.existsSync(path.join(process.cwd(), "public", "logo.webp"));

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.nameExpansion}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "en_NG", url: siteConfig.url, siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`, description: siteConfig.description,
  },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const logo = <FoundaLogo variant="full" src={hasLogoWebp ? "/logo.webp" : undefined} />;
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} ${fontSerif.variable} ${fontSerifDisplay.variable} flex min-h-screen flex-col font-sans`}>
        <ThemeProvider>
          <LocaleProvider>
            <VeilProvider>
              <QueryProvider>
                <TooltipProvider>
                  <ScrollProgress />
                  <FirstLoadVeil />
                  <RouteVeil />
                  <HideOnAdmin><CookieBanner /></HideOnAdmin>
                  <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground">
                    Skip to content
                  </a>
                  <Header logo={logo} />
                  <AnalyticsBeacon />
                  <HideOnAdmin><Breadcrumbs /></HideOnAdmin>
                  <main id="main" className="flex-1">{children}</main>
                  <HideOnAdmin><Footer logo={logo} /></HideOnAdmin>
                  <HideOnAdmin><BackToTop /></HideOnAdmin>
                </TooltipProvider>
              </QueryProvider>
            </VeilProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}