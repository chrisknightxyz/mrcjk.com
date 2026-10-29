import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/"].map((path) => ({ url: `${site.url}${path}` }));
}
