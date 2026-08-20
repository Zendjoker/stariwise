import type { Metadata } from "next";
import TaskBoard from "@/components/helpers/TaskBoard";

export const metadata: Metadata = {
  title: "Find a Helper in SF — Stairwise",
  description: "Post a moving, lifting, assembly, or cleaning task and connect with skilled helpers in San Francisco. Free to post. Helpers apply directly.",
  alternates: { canonical: "https://gostairwise.com/need-helper/" },
  openGraph: {
    title: "Find a Helper in SF — Stairwise",
    description: "Post a task and connect with skilled SF helpers. Moving, lifting, assembly, cleaning.",
    url: "https://gostairwise.com/need-helper/",
    images: [{ url: "https://gostairwise.com/images/hero.webp" }],
  },
};

export default function NeedHelperPage() {
  return (
    <main>
      <TaskBoard />
    </main>
  );
}
