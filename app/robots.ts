import type { MetadataRoute } from "next";
import { personal } from "@/data/portfolio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${personal.siteUrl}/sitemap.xml`,
  };
}
