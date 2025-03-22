import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, you would send this to your API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
      
      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        });
        // Reset the form
        setName("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-8 border-b pb-4 border-accent">
          Contact Us
        </h1>
        
        <p className="text-secondary mb-8">
          Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
        </p>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block font-medium mb-2">Name</label>
            <input 
              type="text" 
              id="name"
              className="w-full px-4 py-2 border border-accent focus:outline-none focus:border-black transition-standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block font-medium mb-2">Email</label>
            <input 
              type="email" 
              id="email"
              className="w-full px-4 py-2 border border-accent focus:outline-none focus:border-black transition-standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block font-medium mb-2">Message</label>
            <textarea 
              id="message"
              rows={6}
              className="w-full px-4 py-2 border border-accent focus:outline-none focus:border-black transition-standard"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-standard"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
        
        <div className="mt-12 border-t border-accent pt-8">
          <h2 className="font-heading text-2xl font-bold mb-4">Other Ways to Connect</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-heading font-bold mb-2">Email</h3>
              <p className="text-secondary">contact@minimalblog.com</p>
            </div>
            
            <div>
              <h3 className="font-heading font-bold mb-2">Social Media</h3>
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
          </div>
        </div>
      </div>
    </main>
  );
}
