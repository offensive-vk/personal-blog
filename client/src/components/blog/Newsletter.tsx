import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, you would send this to your API
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        toast({
          title: "Success!",
          description: "You've been subscribed to the newsletter.",
        });
        setEmail("");
      } else {
        throw new Error("Failed to subscribe");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem subscribing you to the newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="border border-accent p-8 mb-16">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-heading text-2xl font-bold mb-4">Subscribe to the Newsletter</h2>
        <p className="text-secondary mb-6">Get the latest posts delivered straight to your inbox. No spam, ever.</p>
        
        <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow px-4 py-2 border border-accent bg-transparent text-foreground focus:outline-none focus:border-foreground transition-standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="px-6 py-2 bg-secondary text-background hover:bg-secondary/90 transition-standard"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}
