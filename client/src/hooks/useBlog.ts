import { useState, useEffect, useCallback } from "react";
import { getAllPosts, getPostBySlug, getPostsByCategory, Post } from "@/lib/markdownUtils";

export function useBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function loadPosts() {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load blog posts");
        setIsLoading(false);
      }
    }
    
    loadPosts();
  }, []);
  
  const getPost = useCallback(async (slug: string): Promise<Post | null> => {
    try {
      return await getPostBySlug(slug);
    } catch (err) {
      setError(`Failed to load post: ${slug}`);
      return null;
    }
  }, []);
  
  const getPostsByTag = useCallback(async (category: string): Promise<Post[]> => {
    try {
      return await getPostsByCategory(category);
    } catch (err) {
      setError(`Failed to load posts for category: ${category}`);
      return [];
    }
  }, []);
  
  const getFeaturedPost = useCallback((): Post | null => {
    return posts.find(post => post.featured) || (posts.length > 0 ? posts[0] : null);
  }, [posts]);
  
  const getRecentPosts = useCallback((count: number = 3): Post[] => {
    const featuredPost = getFeaturedPost();
    const filteredPosts = featuredPost
      ? posts.filter(post => post.slug !== featuredPost.slug)
      : [...posts];
    
    return filteredPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  }, [posts, getFeaturedPost]);
  
  const getRelatedPosts = useCallback((currentSlug: string, count: number = 2): Post[] => {
    const currentPost = posts.find(post => post.slug === currentSlug);
    if (!currentPost) return [];
    
    // Find posts with similar categories
    const relatedByCategory = posts
      .filter(post => 
        post.slug !== currentSlug && 
        post.categories.some(cat => currentPost.categories.includes(cat))
      )
      .sort((a, b) => {
        // Count how many categories match
        const aMatches = a.categories.filter(cat => currentPost.categories.includes(cat)).length;
        const bMatches = b.categories.filter(cat => currentPost.categories.includes(cat)).length;
        return bMatches - aMatches;
      })
      .slice(0, count);
    
    // If we don't have enough related posts by category, add recent posts
    if (relatedByCategory.length < count) {
      const recentPosts = posts
        .filter(post => 
          post.slug !== currentSlug && 
          !relatedByCategory.some(relatedPost => relatedPost.slug === post.slug)
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, count - relatedByCategory.length);
      
      return [...relatedByCategory, ...recentPosts];
    }
    
    return relatedByCategory;
  }, [posts]);
  
  const getCategoryCount = useCallback((category: string): number => {
    return posts.filter(post => 
      post.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
    ).length;
  }, [posts]);
  
  const getAllCategories = useCallback((): { name: string; count: number }[] => {
    const categories = new Map<string, number>();
    
    posts.forEach(post => {
      post.categories.forEach(category => {
        const normalizedCategory = category.toLowerCase();
        categories.set(normalizedCategory, (categories.get(normalizedCategory) || 0) + 1);
      });
    });
    
    return Array.from(categories.entries())
      .map(([name, count]) => ({ 
        name: name.charAt(0).toUpperCase() + name.slice(1), 
        count 
      }))
      .sort((a, b) => b.count - a.count);
  }, [posts]);
  
  return {
    posts,
    isLoading,
    error,
    getPost,
    getPostsByTag,
    getFeaturedPost,
    getRecentPosts,
    getRelatedPosts,
    getCategoryCount,
    getAllCategories,
  };
}
