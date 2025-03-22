import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-accent py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="font-heading font-bold text-2xl mb-4">Minimal Blog</h2>
            <p className="text-secondary mb-6">
              A clean, minimalist blog focused on content and readability. Built with modern web technologies and a passion for simple design.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-black hover:text-secondary transition-standard">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-black hover:text-secondary transition-standard">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-black hover:text-secondary transition-standard">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-black hover:text-secondary transition-standard">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/programming" className="text-secondary hover:text-black transition-standard">
                  Programming
                </Link>
              </li>
              <li>
                <Link href="/category/writing" className="text-secondary hover:text-black transition-standard">
                  Writing
                </Link>
              </li>
              <li>
                <Link href="/category/design" className="text-secondary hover:text-black transition-standard">
                  Design
                </Link>
              </li>
              <li>
                <Link href="/category/productivity" className="text-secondary hover:text-black transition-standard">
                  Productivity
                </Link>
              </li>
              <li>
                <Link href="/category/technology" className="text-secondary hover:text-black transition-standard">
                  Technology
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-secondary hover:text-black transition-standard">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary hover:text-black transition-standard">
                  About
                </Link>
              </li>
              <li>
                <Link href="/category/all" className="text-secondary hover:text-black transition-standard">
                  Archives
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary hover:text-black transition-standard">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-secondary hover:text-black transition-standard">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-accent mt-12 pt-8 text-center text-sm text-secondary">
          <p>&copy; {new Date().getFullYear()} Minimal Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
