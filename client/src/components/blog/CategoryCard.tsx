import { Link } from "wouter";

interface CategoryCardProps {
  icon: string;
  name: string;
  count: number;
}

export default function CategoryCard({ icon, name, count }: CategoryCardProps) {
  return (
    <Link 
      href={`/category/${name.toLowerCase()}`}
      className="group block border border-accent p-6 text-center hover:bg-black transition-standard"
    >
      <i className={`${icon} text-3xl mb-2 group-hover:text-white`}></i>
      <h3 className="font-heading font-bold group-hover:text-white">{name}</h3>
      <p className="text-sm text-secondary group-hover:text-white">{count} posts</p>
    </Link>
  );
}
