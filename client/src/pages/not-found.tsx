import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4 border-2">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center mb-6">
            <AlertCircle className="h-16 w-16 text-destructive mb-4" />
            <h1 className="text-3xl font-heading font-bold">404 Not Found</h1>
            <p className="mt-2 text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <Link href="/">
              <a className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Return Home
              </a>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
