export default function Contact() {
  return (
    <>
      <title>Contact Us - Lumiere</title>
      <meta
        name="description"
        content="Contact the Lumiere team for feedback, questions, or content concerns."
      />

      <div className="container max-w-2xl py-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          Contact Us
        </h1>

        <p className="text-muted-foreground mb-8">
          Have feedback, questions, or something to report? We’re always happy
          to hear from fellow cinephiles.
        </p>

        {/* Main Contact Card */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-semibold mb-3">Get in Touch</h2>

          <p className="text-muted-foreground mb-4">
            You can reach us directly at the email address below. We try to
            respond as quickly as possible.
          </p>

          <p className="text-lg font-medium">
            📧{" "}
            <a
              href="mailto:thexilicon@gmail.com"
              className="text-primary hover:underline"
            >
              thexilicon@gmail.com
            </a>
          </p>
        </div>

        {/* Info Cards */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-2">General Feedback</h3>
            <p className="text-sm text-muted-foreground">
              Suggestions, feature ideas, or thoughts on how we can improve
              Lumiere are always welcome.
            </p>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold mb-2">Content Concerns</h3>
            <p className="text-sm text-muted-foreground">
              If you come across content that feels inappropriate or violates
              our guidelines, please report it via email.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
