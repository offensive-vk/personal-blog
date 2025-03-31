import Newsletter from "@/components/blog/Newsletter";

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="blog-content mx-auto prose prose-lg max-w-none dark:prose-invert text-foreground">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-8 border-b pb-4 border-accent text-foreground">
          About My Minimal Blog
        </h1>
        
        <p className="text-foreground">
          Welcome to Minimal Blog, a space dedicated to exploring ideas through clear, thoughtful writing. Here, we embrace simplicity not just in design, but in our approach to content.
        </p>
        
        <h2 className="font-heading text-3xl font-bold mt-8 mb-4 text-foreground">Our Philosophy</h2>
        
        <p className="text-foreground">
          We believe that great content doesn't need flashy distractions. By focusing on typography, readability, and thoughtful organization, we create a reading experience that puts your comfort and focus first.
        </p>
        
        <p className="text-foreground">
          The black and white aesthetic isn't just a design choice—it's a statement about getting back to the essence of what makes content valuable: the ideas themselves.
        </p>
        
        <h2 className="font-heading text-3xl font-bold mt-8 mb-4 text-foreground">What We Write About</h2>
        
        <p className="text-foreground">
          Our content spans several interconnected areas:
        </p>
        
        <ul className="text-foreground">
          <li><strong>Programming & Development</strong> - Practical guides, thoughtful analyses, and explorations of code.</li>
          <li><strong>Writing & Communication</strong> - How to express ideas clearly and effectively.</li>
          <li><strong>Design & Aesthetics</strong> - The principles that guide visual communication and user experience.</li>
          <li><strong>Productivity & Focus</strong> - Finding better ways to work in a distracted world.</li>
        </ul>
        
        <h2 className="font-heading text-3xl font-bold mt-8 mb-4 text-foreground">The Team</h2>
        
        <div className="grid md:grid-cols-2 gap-8 my-8">
          <div className="flex items-start space-x-4">
            <img 
              src="@/assets/cover.jpg" 
              alt="John Doe" 
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h3 className="font-heading font-bold text-xl text-foreground">Vedansh </h3>
              <p className="text-secondary text-sm mb-2">Founder & Lead Writer</p>
              <p className="text-foreground">Focused on programming and development topics, with a particular interest in user interface design and frontend technologies.</p>
            </div>
          </div>
        </div>
        
        <h2 className="font-heading text-3xl font-bold mt-8 mb-4 text-foreground">Get in Touch</h2>
        
        <p className="text-foreground">
          We love hearing from our readers. If you have questions, suggestions, or just want to say hello, feel free to <a href="/contact" className="text-primary hover:text-secondary transition-standard underline">contact us</a>.
        </p>
        
        <p className="text-foreground">
          If you'd like to stay updated with our latest posts, don't forget to subscribe to our newsletter below.
        </p>
      </div>
      
      <div className="mt-12">
        <Newsletter />
      </div>
    </main>
  );
}
