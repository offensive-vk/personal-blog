import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useBlog } from "@/hooks/useBlog";
import BlogPost from "@/components/blog/BlogPost";
import Newsletter from "@/components/blog/Newsletter";
import { Post } from "@/lib/markdownUtils";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostPage() {
  const [, params] = useRoute("/post/:slug");
  const { getPost, isLoading } = useBlog();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
      if (!params?.slug) {
        setError("No post slug provided");
        setLoading(false);
        return;
      }

      try {
        const fetchedPost = await getPost(params.slug);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [params?.slug, getPost]);

  if (loading || isLoading) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="blog-content mx-auto space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-16 w-4/5" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-80 w-full" />
          </div>
          
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <h1 className="font-heading text-4xl font-bold mb-4">Error</h1>
          <p className="text-secondary mb-8">{error || "Failed to load post"}</p>
          <a href="/" className="inline-block px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition-standard">
            Return to Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BlogPost post={post} />
      <Newsletter />
    </main>
  );
}
