import { Link } from "wouter";
import { Post } from "@/lib/markdownUtils";

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="grid md:grid-cols-5 gap-8">
      {post.coverImage && (
        <div className="md:col-span-2">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-64 object-cover"
          />
        </div>
      )}
      <div className="md:col-span-3">
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
        <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-3">
          <Link href={`/post/${post.slug}`} className="hover:text-secondary transition-standard">
            {post.title}
          </Link>
        </h3>
        <p className="text-secondary mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center text-sm text-secondary">
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span className="mx-2">•</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </article>
  );
}
