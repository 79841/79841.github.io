import { Contact } from "@/features/site/contact";
import { Experience } from "@/features/site/experience";
import { Hero } from "@/features/site/hero";
import { RecentPosts } from "@/features/site/recent-posts";
import { StackRows } from "@/features/site/stack";
import { Works } from "@/features/site/works";
import { getAllPosts } from "@/shared/lib/blog";

const RECENT_POST_COUNT = 3;

export default function Home() {
  const posts = getAllPosts();

  return (
    <main>
      <Hero />
      <Works />
      <RecentPosts posts={posts.slice(0, RECENT_POST_COUNT)} />
      <Experience />
      <StackRows />
      <Contact />
    </main>
  );
}
