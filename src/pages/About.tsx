export default function About() {
  return (
    <>
      <title>About Us - Lumiere</title>
      <meta
        name="description"
        content="Learn more about Lumiere, a community-driven platform for cinephiles to explore and share alternate movie endings."
      />

      <div className="container max-w-3xl py-12">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          About Lumiere
        </h1>

        <p className="text-muted-foreground mb-10">
          A place for cinephiles to explore stories beyond the final frame.
        </p>

        {/* Main content */}
        <div className="glass-card p-8 space-y-6">
          <p className="text-base leading-relaxed">
            <strong>Lumiere</strong> is a community-driven platform built for
            movie lovers who enjoy thinking beyond the screen. We believe that
            some of the most interesting conversations about films begin after
            the credits roll, especially when viewers imagine how a story could
            have ended differently.
          </p>

          <p className="text-base leading-relaxed">
            Lumiere gives cinephiles a space to browse movies, write alternate
            endings, and explore creative interpretations shared by others.
            Every ending on the platform is fan-written and reflects personal
            imagination, not official versions.
          </p>

          <p className="text-base leading-relaxed">
            We do not host, stream, or distribute movies. Lumiere focuses purely
            on creative expression, discussion, and appreciation of storytelling
            in cinema.
          </p>

          <p className="text-base leading-relaxed">
            Our goal is simple: to celebrate films, creativity, and respectful
            discussion, one alternate ending at a time.
          </p>
        </div>

        {/* Values / Info cards */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-2">For Movie Lovers</h3>
            <p className="text-sm text-muted-foreground">
              Lumiere is built for people who love movies and enjoy imagining
              new possibilities for stories they care about.
            </p>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold mb-2">Creative & Community-Driven</h3>
            <p className="text-sm text-muted-foreground">
              All content on Lumiere is created by the community, encouraging
              creativity, discussion, and shared appreciation of cinema.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
