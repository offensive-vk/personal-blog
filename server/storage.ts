import { 
  Post, InsertPost, 
  Subscriber, InsertSubscriber,
  Contact, InsertContact
} from "@shared/schema";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { calculateReadingTime } from "../client/src/lib/markdownUtils";
import { marked } from "marked";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface IStorage {
  // Post related methods
  getAllPosts(): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  getPostsByCategory(category: string): Promise<Post[]>;
  
  // Subscriber related methods
  addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  
  // Contact related methods
  addContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private posts: Map<string, Post>;
  private subscribers: Map<number, Subscriber>;
  private contacts: Map<number, Contact>;
  private subscribersCounter: number;
  private contactsCounter: number;

  constructor() {
    this.posts = new Map();
    this.subscribers = new Map();
    this.contacts = new Map();
    this.subscribersCounter = 1;
    this.contactsCounter = 1;
    
    // Load posts from markdown files
    this.loadPosts();
  }

  private async loadPosts() {
    try {
      const postsDir = path.join(__dirname, "..", "client", "src", "data", "posts");
      const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
      
      let id = 1;
      for (const file of files) {
        const filePath = path.join(postsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Parse frontmatter
        const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
        const match = content.match(frontmatterRegex);
        
        if (match && match[1]) {
          const frontmatter = match[1];
          const frontmatterLines = frontmatter.split('\n');
          const metadata: Record<string, any> = {};
          
          frontmatterLines.forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
              const value = valueParts.join(':').trim();
              
              if (value.startsWith('"') && value.endsWith('"')) {
                metadata[key.trim()] = value.slice(1, -1);
              } else if (value === 'true' || value === 'false') {
                metadata[key.trim()] = value === 'true';
              } else if (key.trim() === 'categories') {
                // Parse categories as an array
                const categoriesMatch = value.match(/\[(.*)\]/);
                if (categoriesMatch && categoriesMatch[1]) {
                  metadata[key.trim()] = categoriesMatch[1]
                    .split(',')
                    .map(cat => cat.trim().replace(/"/g, ''));
                } else {
                  metadata[key.trim()] = [];
                }
              } else if (key.trim() === 'author') {
                // Parse author as an object
                const authorData: Record<string, string> = {};
                let isInAuthor = false;
                
                for (let i = frontmatterLines.indexOf(line) + 1; i < frontmatterLines.length; i++) {
                  const authorLine = frontmatterLines[i];
                  if (!authorLine.startsWith('  ')) {
                    break;
                  }
                  
                  const [authorKey, ...authorValueParts] = authorLine.trim().split(':');
                  if (authorKey && authorValueParts.length) {
                    const authorValue = authorValueParts.join(':').trim();
                    if (authorValue.startsWith('"') && authorValue.endsWith('"')) {
                      authorData[authorKey.trim()] = authorValue.slice(1, -1);
                    } else {
                      authorData[authorKey.trim()] = authorValue;
                    }
                  }
                }
                
                metadata.author = authorData;
              } else {
                metadata[key.trim()] = value;
              }
            }
          });
          
          // Get the actual content after frontmatter
          const contentWithoutFrontmatter = content.replace(frontmatterRegex, '').trim();
          
          // Convert markdown to HTML using marked
          const htmlContent = marked.parse(contentWithoutFrontmatter) as string;
          
          const post: Post = {
            id,
            slug: metadata.slug,
            title: metadata.title,
            content: htmlContent,
            excerpt: metadata.excerpt,
            coverImage: metadata.coverImage,
            date: new Date(metadata.date),
            readingTime: calculateReadingTime(contentWithoutFrontmatter),
            featured: metadata.featured || false,
            categories: metadata.categories || [],
            authorName: metadata.author.name,
            authorRole: metadata.author.role,
            authorAvatar: metadata.author.avatar,
            authorTwitter: metadata.author.twitter || null,
            authorGithub: metadata.author.github || null,
            authorLinkedin: metadata.author.linkedin || null,
          };
          
          this.posts.set(post.slug, post);
          id++;
        }
      }
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  }

  async getAllPosts(): Promise<Post[]> {
    return Array.from(this.posts.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    return this.posts.get(slug);
  }

  async getPostsByCategory(category: string): Promise<Post[]> {
    if (category.toLowerCase() === 'all') {
      return this.getAllPosts();
    }
    
    return Array.from(this.posts.values())
      .filter(post => post.categories.some(
        cat => cat.toLowerCase() === category.toLowerCase()
      ))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const newSubscriber: Subscriber = {
      id: this.subscribersCounter++,
      email: subscriber.email,
      subscribedAt: new Date(),
    };
    
    this.subscribers.set(newSubscriber.id, newSubscriber);
    return newSubscriber;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      subscriber => subscriber.email === email
    );
  }

  async addContact(contact: InsertContact): Promise<Contact> {
    const newContact: Contact = {
      id: this.contactsCounter++,
      name: contact.name,
      email: contact.email,
      message: contact.message,
      submittedAt: new Date(),
    };
    
    this.contacts.set(newContact.id, newContact);
    return newContact;
  }
}

export const storage = new MemStorage();
