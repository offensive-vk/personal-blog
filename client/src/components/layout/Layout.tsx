import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useSearch } from "@/hooks/useSearch";
import { useBlog } from "@/hooks/useBlog";
import { Link } from "wouter";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { searchQuery } = useSearch();
  const { posts } = useBlog();
  
  // Filter posts based on search query
  const filteredPosts = searchQuery
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.categories.some((category) =>
            category.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : [];
  
  // Show search results if a search query exists
  const showSearchResults = searchQuery.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {showSearchResults ? (
        <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-heading text-3xl font-bold mb-8 border-b pb-4 border-accent">
            Search Results for "{searchQuery}"
          </h2>
          
          {filteredPosts.length === 0 ? (
            <p className="text-secondary">No posts found matching your search criteria.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post.slug} className="border-b border-accent pb-6 transition-standard hover:translate-y-[-4px]">
                  {post.coverImage && (
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img 
                        src={post.coverImage} 
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.map((category) => (
                      <Link 
                        key={category} 
                        href={`/category/${category.toLowerCase()}`}
                        className="px-2 py-1 text-xs border border-accent rounded-full transition-standard hover:bg-black hover:text-white cursor-pointer"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3">
                    <Link href={`/post/${post.slug}`} className="hover:text-secondary transition-standard">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-secondary mb-4 text-sm">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-xs text-secondary">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      ) : (
        children
      )}
      
      <Footer />
    </div>
  );
}
