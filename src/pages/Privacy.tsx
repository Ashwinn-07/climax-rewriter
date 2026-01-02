export default function Privacy() {
  return (
    <>
      <title>Privacy Policy - Lumiere</title>
      <meta
        name="description"
        content="Privacy Policy for Lumiere. Learn how we collect, use, and protect your personal information."
      />

      <div className="container max-w-3xl py-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </p>

          <section className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you create an account on Lumiere, we collect the following
              information:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Email address (for account authentication)</li>
              <li>Display name (publicly visible on your posts)</li>
              <li>Content you create (alternate movie endings)</li>
              <li>Voting activity on other users' content</li>
            </ul>
          </section>

          <section className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">
              How We Use Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide and maintain our service</li>
              <li>Authenticate your account</li>
              <li>Display your content to other users</li>
              <li>Track voting on content</li>
              <li>Improve our platform</li>
            </ul>
          </section>

          <section className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use the following third-party services:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>
                <strong>TMDB API</strong> - To fetch movie information
              </li>
              <li>
                <strong>Google AdSense</strong> - To display advertisements
              </li>
              <li>
                <strong>Analytics</strong> - To understand how users interact
                with our platform
              </li>
            </ul>
          </section>

          <section className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your
              personal information. Your password is securely hashed and never
              stored in plain text. All data transmission is encrypted using
              HTTPS.
            </p>
          </section>

          <section className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access your personal data</li>
              <li>Delete your account and associated data</li>
              <li>Modify your display name</li>
              <li>Remove content you've created</li>
            </ul>
          </section>

          <section className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use essential cookies for authentication and session
              management. Third-party advertising partners may also use cookies
              to serve personalized ads.
            </p>
          </section>

          <section className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us through our Contact page.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
