import { Link } from "wouter";
import { Post } from "@/lib/markdownUtils";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="border-b border-accent pb-6 transition-standard hover:translate-y-[-4px]">
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
  );
}
