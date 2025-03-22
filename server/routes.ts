import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema, insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for blog
  
  // Get all posts
  app.get("/api/posts", async (_req: Request, res: Response) => {
    try {
      const posts = await storage.getAllPosts();
      
      // Transform posts to client-friendly format
      const clientPosts = posts.map(post => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        coverImage: post.coverImage,
        excerpt: post.excerpt,
        content: post.content,
        readingTime: post.readingTime,
        featured: post.featured,
        categories: post.categories,
        author: {
          name: post.authorName,
          role: post.authorRole,
          avatar: post.authorAvatar,
          twitter: post.authorTwitter,
          github: post.authorGithub,
          linkedin: post.authorLinkedin,
        },
      }));
      
      return res.status(200).json(clientPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      return res.status(500).json({ message: "Failed to fetch posts" });
    }
  });
  
  // Get post by slug
  app.get("/api/posts/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const post = await storage.getPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      // Transform post to client-friendly format
      const clientPost = {
        slug: post.slug,
        title: post.title,
        date: post.date,
        coverImage: post.coverImage,
        excerpt: post.excerpt,
        content: post.content,
        readingTime: post.readingTime,
        featured: post.featured,
        categories: post.categories,
        author: {
          name: post.authorName,
          role: post.authorRole,
          avatar: post.authorAvatar,
          twitter: post.authorTwitter,
          github: post.authorGithub,
          linkedin: post.authorLinkedin,
        },
      };
      
      return res.status(200).json(clientPost);
    } catch (error) {
      console.error("Error fetching post:", error);
      return res.status(500).json({ message: "Failed to fetch post" });
    }
  });
  
  // Get posts by category
  app.get("/api/categories/:category", async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const posts = await storage.getPostsByCategory(category);
      
      // Transform posts to client-friendly format
      const clientPosts = posts.map(post => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        coverImage: post.coverImage,
        excerpt: post.excerpt,
        content: post.content,
        readingTime: post.readingTime,
        featured: post.featured,
        categories: post.categories,
        author: {
          name: post.authorName,
          role: post.authorRole,
          avatar: post.authorAvatar,
          twitter: post.authorTwitter,
          github: post.authorGithub,
          linkedin: post.authorLinkedin,
        },
      }));
      
      return res.status(200).json(clientPosts);
    } catch (error) {
      console.error("Error fetching posts by category:", error);
      return res.status(500).json({ message: "Failed to fetch posts by category" });
    }
  });
  
  // Subscribe to newsletter
  app.post("/api/subscribe", async (req: Request, res: Response) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      
      // Check if already subscribed
      const existingSubscriber = await storage.getSubscriberByEmail(validatedData.email);
      if (existingSubscriber) {
        return res.status(400).json({ message: "Email already subscribed" });
      }
      
      const subscriber = await storage.addSubscriber(validatedData);
      return res.status(201).json({ 
        message: "Subscribed successfully",
        email: subscriber.email
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error subscribing:", error);
      return res.status(500).json({ message: "Failed to subscribe" });
    }
  });
  
  // Submit contact form
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.addContact(validatedData);
      
      return res.status(201).json({ 
        message: "Message sent successfully",
        id: contact.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error submitting contact form:", error);
      return res.status(500).json({ message: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
