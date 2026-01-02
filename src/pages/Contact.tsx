import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data
    setSubmitted(true);
  };

  return (
    <>
      <title>Contact Us - Anti Climax</title>
      <meta name="description" content="Get in touch with the Anti Climax team. We'd love to hear from you." />

      <div className="container max-w-2xl py-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Have questions, feedback, or just want to say hello? We'd love to hear from you.
        </p>

        {submitted ? (
          <div className="glass-card p-8 text-center">
            <svg
              className="w-16 h-16 mx-auto text-primary mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-xl font-semibold mb-2">Message Sent!</h2>
            <p className="text-muted-foreground">
              Thank you for reaching out. We'll get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="input-dark"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input-dark"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <select className="input-dark" required>
                <option value="">Select a topic</option>
                <option value="feedback">General Feedback</option>
                <option value="bug">Report a Bug</option>
                <option value="feature">Feature Request</option>
                <option value="account">Account Issue</option>
                <option value="content">Content Concern</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows={6}
                placeholder="Tell us what's on your mind..."
                className="input-dark resize-none"
                required
              />
            </div>

            <button type="submit" className="w-full btn-primary">
              Send Message
            </button>
          </form>
        )}

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-2">General Inquiries</h3>
            <p className="text-sm text-muted-foreground">
              For general questions about Anti Climax, our policies, or how to use the platform.
            </p>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold mb-2">Report Content</h3>
            <p className="text-sm text-muted-foreground">
              If you find content that violates our terms, please report it through the contact form.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
