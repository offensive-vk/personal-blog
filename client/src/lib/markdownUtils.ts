import { apiRequest } from "./queryClient";

export interface Author {
  name: string;
  role: string;
  avatar: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  content: string;
  categories: string[];
  readingTime: number;
  featured?: boolean;
}

// Get all posts (used on home page)
export async function getAllPosts(): Promise<Post[]> {
  const response = await apiRequest("GET", "/api/posts", undefined);
  const posts = await response.json();
  console.dir(posts);
  return posts;
}

// Get a single post by slug (used on post page)
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await apiRequest("GET", `/api/posts/${slug}`, undefined);
    const post = await response.json();
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// Get posts by category (used on category page)
export async function getPostsByCategory(category: string): Promise<Post[]> {
  try {
    const response = await apiRequest("GET", `/api/categories/${category}`, undefined);
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
}

// Calculates estimated reading time for a post
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime < 1 ? 1 : readingTime;
}
