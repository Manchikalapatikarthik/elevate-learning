
import type { MetadataRoute } from "next";

const BASE_URL = "https://www.elevateorbit.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
