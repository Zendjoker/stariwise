import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/need-helper/manage/"],
    },
    sitemap: "https://gostairwise.com/sitemap.xml",
  };
}
