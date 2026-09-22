import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stairwise: San Francisco Movers & Heavy Lifting",
    short_name: "Stairwise",
    description:
      "San Francisco moving, heavy lifting, and furniture assembly. Sure-footed on hills, walk-ups, and narrow staircases.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F6F4",
    theme_color: "#123F36",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
