import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gostairwise.com";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/reviews`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/#services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#work`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/#pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#areas`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/#contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
