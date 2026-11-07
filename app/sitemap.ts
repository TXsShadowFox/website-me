import type { MetadataRoute } from "next";
import { personal, projects, research } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: personal.siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${personal.siteUrl}/projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${personal.siteUrl}/projects/${project.id}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: project.featured ? 0.7 : 0.5,
    })),
    ...research.map((paper) => ({
      url: `${personal.siteUrl}/research/${paper.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
