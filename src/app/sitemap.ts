import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/services", "/ai", "/work", "/privacy"].map((path) => ({ url: `${site.url}${path}` }));
}
