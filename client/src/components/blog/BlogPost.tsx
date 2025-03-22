import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Post } from "@/lib/markdownUtils";
import { useBlog } from "@/hooks/useBlog";

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  const { getRelatedPosts } = useBlog();
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    setRelatedPosts(getRelatedPosts(post.slug, 2));
  }, [post.slug, getRelatedPosts]);

  return (
    <section id="post" className="blog-content mx-auto">
      <article>
        <header className="mb-8">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
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
          
          <div className="flex items-center text-sm text-secondary mb-8">
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="mx-2">•</span>
            <span>{post.readingTime} min read</span>
          </div>
          
          {post.coverImage && (
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-80 object-cover mb-8"
            />
          )}
        </header>
        
        <div 
          className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-base prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:bg-accent/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:italic prose-img:rounded-md prose-pre:bg-muted prose-pre:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
      
      {/* Author info */}
      <div className="border-t border-b border-accent my-12 py-8">
        <div className="flex items-center">
          <img 
            src={post.author.avatar} 
            alt={`${post.author.name} profile picture`} 
            className="w-16 h-16 rounded-full mr-4 object-cover"
          />
          <div>
            <h3 className="font-heading font-bold">{post.author.name}</h3>
            <p className="text-secondary text-sm mb-2">{post.author.role}</p>
            <div className="flex space-x-3">
              {post.author.twitter && (
                <a href={post.author.twitter} target="_blank" rel="noreferrer" className="text-black hover:text-secondary transition-standard">
                  <i className="fab fa-twitter"></i>
                </a>
              )}
              {post.author.github && (
                <a href={post.author.github} target="_blank" rel="noreferrer" className="text-black hover:text-secondary transition-standard">
                  <i className="fab fa-github"></i>
                </a>
              )}
              {post.author.linkedin && (
                <a href={post.author.linkedin} target="_blank" rel="noreferrer" className="text-black hover:text-secondary transition-standard">
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="my-12">
          <h3 className="font-heading text-2xl font-bold mb-6">Related Posts</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.slug} href={`/post/${relatedPost.slug}`} className="group flex space-x-4">
                {relatedPost.coverImage && (
                  <img 
                    src={relatedPost.coverImage} 
                    alt={`${relatedPost.title} thumbnail`}
                    className="w-20 h-20 object-cover flex-shrink-0"
                  />
                )}
                <div>
                  <h4 className="font-heading font-bold group-hover:text-secondary transition-standard">
                    {relatedPost.title}
                  </h4>
                  <p className="text-sm text-secondary">
                    {new Date(relatedPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
