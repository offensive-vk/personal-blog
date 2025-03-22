import React from "react";

export default function PrivacyPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="blog-content mx-auto prose prose-lg max-w-none dark:prose-invert text-foreground">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-8 border-b pb-4 border-accent text-foreground">
          Privacy Policy
        </h1>
        
        <p className="text-foreground">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        
        <p className="text-foreground">
          At Minimal Blog, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
        </p>
        
        <h2 className="font-heading text-3xl font-bold mt-8 mb-4 text-foreground">Information We Collect</h2>
        
        <h3 className="font-heading text-2xl font-bold mt-6 mb-3 text-foreground">Personal Data</h3>
        <p className="text-foreground">
          We may collect personal information that you voluntarily provide to us when you:
        </p>
        <ul className="text-foreground">
          <li>Subscribe to our newsletter</li>
          <li>Fill out a contact form</li>
          <li>Register for an account (if applicable)</li>
          <li>Participate in surveys or contests</li>
          <li>Comment on blog posts (if applicable)</li>
        </ul>
        <p className="text-foreground">
          The personal information we collect may include your name, email address, and any other information you choose to provide.
        </p>
        
        <h3 className="font-heading text-2xl font-bold mt-6 mb-3 text-foreground">Automatically Collected Information</h3>
        <p className="text-foreground">
          When you visit our website, we may automatically collect certain information about your device, including:
        </p>
        <ul className="text-foreground">
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Pages visited and time spent on those pages</li>
          <li>Referring website addresses</li>
        </ul>
        <p className="text-foreground">
          This information helps us understand how visitors use our website and allows us to improve your experience.
        </p>
        
        <h2 className="font-heading text-3xl font-bold mt-8 mb-4 text-foreground">How We Use Your Information</h2>
        
        <p className="text-foreground">
          We may use the information we collect for various purposes, including:
        </p>
        <ul className="text-foreground">
          <li>Providing, maintaining, and improving our website</li>
          <li>Sending newsletters, updates, and marketing communications</li>
          <li>Responding to your comments, questions, and requests</li>
          <li>Analyzing usage patterns to enhance user experience</li>
          <li>Protecting against unauthorized access and other security concerns</li>
        </ul>
        
        <h2 className="font-heading text-3xl font-bold mt-8 mb-4 text-foreground">Cookies and Similar Technologies</h2>
        
        <p className="text-foreground">
          We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>
        
        <h2 className="font-heading text-3xl font-bold mt-8 mb-4 text-foreground">Third-Party Services</h2>
        
        <p className="text-foreground">
          We may use third-party services, such as analytics providers and email marketing platforms, that collect, monitor, and analyze this information. These third parties have their own privacy policies addressing how they use such information.
        </p>
        
        <h2 className="font-heading text-3xl font-bold mt-8 mb-4 text-foreground">Data Security</h2>
        
        <p className="text-foreground">
          We implement reasonable precautions to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
        
        <h2 className="font-heading text-3xl font-bold mt-8 mb-4 text-foreground">Your Data Protection Rights</h2>
        
        <p className="text-foreground">
          Depending on your location, you may have certain rights regarding your personal information, including:
        </p>
        <ul className="text-foreground">
          <li>The right to access the personal information we have about you</li>
          <li>The right to request correction of inaccurate information</li>
          <li>The right to request deletion of your personal information</li>
          <li>The right to object to processing of your personal information</li>
          <li>The right to data portability</li>
          <li>The right to withdraw consent at any time</li>
        </ul>
        
        <h2 className="font-heading text-3xl font-bold mt-8 mb-4 text-foreground">Children's Privacy</h2>
        
        <p className="text-foreground">
          Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
        </p>
        
        <h2 className="font-heading text-3xl font-bold mt-8 mb-4 text-foreground">Changes to This Privacy Policy</h2>
        
        <p className="text-foreground">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
        </p>
        
        <h2 className="font-heading text-3xl font-bold mt-8 mb-4 text-foreground">Contact Us</h2>
        
        <p className="text-foreground">
          If you have questions or concerns about this Privacy Policy, please <a href="/contact" className="text-primary hover:text-secondary transition-standard underline">contact us</a>.
        </p>
      </div>
    </main>
  );
}