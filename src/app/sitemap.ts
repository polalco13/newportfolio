import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://polalcoverro.com",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
