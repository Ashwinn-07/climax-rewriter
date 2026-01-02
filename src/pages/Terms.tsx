export default function Terms() {
  return (
    <>
      <title>Terms of Service - Anti Climax</title>
      <meta name="description" content="Terms of Service for Anti Climax. Please read these terms carefully before using our platform." />

      <div className="container max-w-3xl py-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <section className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using Anti Climax, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed">
              To write alternate endings or vote on content, you must create an account. You are 
              responsible for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Maintaining the security of your account</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate information</li>
            </ul>
          </section>

          <section className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Content Guidelines</h2>
            <p className="text-muted-foreground leading-relaxed">
              When creating alternate endings, you agree to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Create original content only</li>
              <li>Not copy or reproduce copyrighted scripts or dialogues</li>
              <li>Avoid hate speech, harassment, or discriminatory content</li>
              <li>Not post explicit or adult content</li>
              <li>Respect other users and their creations</li>
            </ul>
          </section>

          <section className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              You retain ownership of the alternate endings you create. By posting content on 
              Anti Climax, you grant us a non-exclusive, worldwide, royalty-free license to 
              display your content on our platform.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Movie titles, posters, and related information are provided by TMDB and remain 
              the property of their respective owners.
            </p>
          </section>

          <section className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Prohibited Activities</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Attempt to manipulate voting systems</li>
              <li>Create multiple accounts to inflate votes</li>
              <li>Harass or intimidate other users</li>
              <li>Post spam or promotional content</li>
              <li>Attempt to access other users' accounts</li>
              <li>Use automated systems to access the service</li>
            </ul>
          </section>

          <section className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate your account at any time for violations 
              of these terms. You may also delete your account at any time through your account 
              settings.
            </p>
          </section>

          <section className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              Anti Climax is provided "as is" without warranties of any kind. We do not guarantee 
              that the service will be uninterrupted or error-free.
            </p>
          </section>

          <section className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these terms from time to time. Continued use of the service after 
              changes constitutes acceptance of the new terms.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
