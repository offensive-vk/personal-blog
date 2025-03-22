import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useSearch } from "@/hooks/useSearch";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { searchQuery, setSearchQuery } = useSearch();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="border-b border-accent sticky top-0 bg-background z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-heading font-bold text-2xl tracking-tight text-foreground">
              Minimal Blog
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className={`nav-link text-foreground hover:text-secondary transition-standard ${isActive('/') ? 'after:w-full' : ''}`}>
              Home
            </Link>
            <Link href="/category/all" className={`nav-link text-foreground hover:text-secondary transition-standard ${isActive('/category/all') ? 'after:w-full' : ''}`}>
              Archives
            </Link>
            <Link href="/about" className={`nav-link text-foreground hover:text-secondary transition-standard ${isActive('/about') ? 'after:w-full' : ''}`}>
              About
            </Link>
            <Link href="/contact" className={`nav-link text-foreground hover:text-secondary transition-standard ${isActive('/contact') ? 'after:w-full' : ''}`}>
              Contact
            </Link>
          </nav>
          
          {/* Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
          
          {/* Search */}
          <div className="flex items-center search-expand transition-standard w-36 md:w-48">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-8 pr-4 py-1 w-full border-b border-accent focus:outline-none focus:border-foreground bg-transparent text-foreground transition-standard text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fas fa-search absolute left-2 top-2 text-secondary"></i>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              type="button" 
              className="text-foreground hover:text-secondary transition-standard"
              onClick={toggleMenu}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden border-t border-accent ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="block px-3 py-2 text-foreground hover:bg-accent transition-standard">
            Home
          </Link>
          <Link href="/category/all" className="block px-3 py-2 text-foreground hover:bg-accent transition-standard">
            Archives
          </Link>
          <Link href="/about" className="block px-3 py-2 text-foreground hover:bg-accent transition-standard">
            About
          </Link>
          <Link href="/contact" className="block px-3 py-2 text-foreground hover:bg-accent transition-standard">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
