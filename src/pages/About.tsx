import Aurora from "@/components/landing/Aurora";

export default function About() {
  return (
    <>
      <title>About Us - Lumiere</title>
      <meta
        name="description"
        content="Learn more about Lumiere, a community-driven platform for cinephiles to explore and share alternate movie endings."
      />

      <div className="relative">
        {/* Aurora header background */}
        <div className="absolute inset-x-0 top-0 h-64 overflow-hidden opacity-100 pointer-events-none">
          <Aurora
            colorStops={['#3b0764', '#00e5ff', '#c084fc']}
            amplitude={2.5}
            blend={0.6}
            speed={0.5}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="container max-w-3xl py-12 relative z-10">
          {/* Header */}
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 animate-fade-in-up">
            About Lumiere
          </h1>

          <p className="text-muted-foreground mb-10 animate-fade-in-up stagger-1">
            A place for cinephiles to explore stories beyond the final frame.
          </p>

          {/* Main content */}
          <div className="glass-card p-8 space-y-6 animate-fade-in-up stagger-2">
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
            <div className="glass-card p-6 animate-fade-in-up stagger-3 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 border border-primary/20">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">For Movie Lovers</h3>
              <p className="text-sm text-muted-foreground">
                Lumiere is built for people who love movies and enjoy imagining
                new possibilities for stories they care about.
              </p>
            </div>

            <div className="glass-card p-6 animate-fade-in-up stagger-4 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3 border border-accent/20">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Creative & Community-Driven</h3>
              <p className="text-sm text-muted-foreground">
                All content on Lumiere is created by the community, encouraging
                creativity, discussion, and shared appreciation of cinema.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
