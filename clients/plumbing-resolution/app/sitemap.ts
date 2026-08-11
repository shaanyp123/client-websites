import type { MetadataRoute } from "next";
import { site } from "@/site.config";
import { featuredProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/projects", "/capabilities", "/about", "/contact"];
  return [
    ...staticPages.map((path) => ({
      url: `${site.siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...featuredProjects.map((p) => ({
      url: `${site.siteUrl}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
