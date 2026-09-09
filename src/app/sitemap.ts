import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** Add each public route here as it ships. Admin-fed project pages join in Wave 3. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["/", "/about", "/services", "/projects", "/pricing", "/testimonials", "/faq", "/contact"].map((path) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
