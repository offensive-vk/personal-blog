import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useBlog } from "@/hooks/useBlog";
import BlogCard from "@/components/blog/BlogCard";
import Newsletter from "@/components/blog/Newsletter";
import { Post } from "@/lib/markdownUtils";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:category");
  const { getPostsByTag, isLoading } = useBlog();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      if (!params?.category) {
        setError("No category provided");
        setLoading(false);
        return;
      }

      try {
        const fetchedPosts = await getPostsByTag(params.category);
        setPosts(fetchedPosts);
      } catch (err) {
        setError("Failed to load posts for this category");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [params?.category, getPostsByTag]);

  const categoryName = params?.category 
    ? params.category.charAt(0).toUpperCase() + params.category.slice(1)
    : "";

  const title = params?.category === "all" ? "All Posts" : `${categoryName} Posts`;

  if (loading || isLoading) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Skeleton className="h-12 w-64" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
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
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-4xl font-bold mb-8 border-b pb-4 border-accent">
        {title}
      </h1>

      {error ? (
        <div className="text-center py-16">
          <p className="text-secondary mb-8">{error}</p>
          <a href="/" className="inline-block px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition-standard">
            Return to Home
          </a>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-secondary mb-8">No posts found in this category.</p>
          <a href="/" className="inline-block px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition-standard">
            Return to Home
          </a>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {posts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <Newsletter />
        </>
      )}
    </main>
  );
}
