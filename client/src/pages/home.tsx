import { useEffect, useState } from "react";
import { useBlog } from "@/hooks/useBlog";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogCard from "@/components/blog/BlogCard";
import CategoryCard from "@/components/blog/CategoryCard";
import Newsletter from "@/components/blog/Newsletter";
import { Post } from "@/lib/markdownUtils";
import { Skeleton } from "@/components/ui/skeleton";

// Map category names to Font Awesome icons
const categoryIcons: Record<string, string> = {
  programming: "fas fa-code",
  writing: "fas fa-pen-fancy",
  design: "fas fa-paint-brush",
  productivity: "fas fa-lightbulb",
  technology: "fas fa-laptop-code",
  creativity: "fas fa-brain",
  minimalism: "fas fa-minus",
  javascript: "fab fa-js",
};

export default function Home() {
  const { isLoading, getFeaturedPost, getRecentPosts, getAllCategories } = useBlog();
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    if (!isLoading) {
      setFeaturedPost(getFeaturedPost());
      setRecentPosts(getRecentPosts(3));
      setCategories(getAllCategories());
    }
  }, [isLoading, getFeaturedPost, getRecentPosts, getAllCategories]);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Featured Post */}
      <section className="mb-16">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-8 border-b pb-4 border-accent">
          Featured Post
        </h2>
        
        {isLoading || !featuredPost ? (
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <Skeleton className="w-full h-64" />
            </div>
            <div className="md:col-span-3 space-y-4">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        ) : (
          <FeaturedPost post={featuredPost} />
        )}
      </section>

      {/* Recent Posts */}
      <section className="mb-16">
        <h2 className="font-heading text-3xl font-bold mb-8 border-b pb-4 border-accent">
          Recent Posts
        </h2>
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="space-y-4">
                <Skeleton className="w-full h-48" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-16 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center">
          <a href="/category/all" className="inline-block px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition-standard">
            View All Posts
          </a>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <h2 className="font-heading text-3xl font-bold mb-8 border-b pb-4 border-accent">
          Categories
        </h2>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <Skeleton key={n} className="h-32 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 4).map((category) => (
              <CategoryCard 
                key={category.name}
                icon={categoryIcons[category.name.toLowerCase()] || "fas fa-folder"}
                name={category.name}
                count={category.count}
              />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
}
