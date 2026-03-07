import Aurora from "@/components/landing/Aurora";

export default function WhyEndingsMatter() {
  return (
    <>
      <title>Why Endings Matter in Cinema | Lumiere</title>
      <meta
        name="description"
        content="Explore why movie endings shape our emotional connection to stories, and why reimagining them helps audiences find closure."
      />

      <div className="relative">
        {/* Aurora header background */}
        <div className="absolute inset-x-0 top-0 h-72 overflow-hidden opacity-100 pointer-events-none">
          <Aurora
            colorStops={['#3b0764', '#00e5ff', '#c084fc']}
            amplitude={2.5}
            blend={0.6}
            speed={0.5}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="container max-w-3xl py-12 relative z-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6 animate-fade-in-up">
            Why Endings Matter in Cinema
          </h1>

          <p className="text-muted-foreground mb-6 animate-fade-in-up stagger-1">
            A film's ending is often the most remembered part of its story. It's
            the moment where emotions settle, questions are answered, and meaning
            is shaped. Long after the visuals fade, it's the ending that stays
            with us.
          </p>

          <div className="animate-fade-in-up stagger-2">
            <p className="mb-6">
              Throughout cinema history, great endings have elevated good films into
              unforgettable ones. At the same time, weak or rushed endings have left
              audiences disappointed, confused, or emotionally unsatisfied. An
              ending doesn't just conclude a story, it defines how the entire
              journey is perceived.
            </p>
          </div>

          <div className="animate-fade-in-up stagger-3">
            <h2 className="text-2xl font-serif font-semibold mt-10 mb-4 text-gradient inline-block">
              The Emotional Weight of an Ending
            </h2>

            <p className="mb-6">
              Movies invite us into their worlds, allowing us to connect deeply with
              characters, conflicts, and choices. When an ending feels earned, it
              provides emotional closure. When it doesn't, viewers are often left
              imagining how things could have unfolded differently.
            </p>

            <p className="mb-6">
              This emotional gap is natural. Cinema is subjective, every viewer
              brings their own expectations, values, and interpretations. What feels
              satisfying to one person may feel incomplete to another.
            </p>
          </div>

          <div className="animate-fade-in-up stagger-4">
            <h2 className="text-2xl font-serif font-semibold mt-10 mb-4 text-gradient inline-block">
              Reimagining Stories as a Creative Expression
            </h2>

            <p className="mb-6">
              Reimagining an ending isn't about dismissing the original work. It's
              about engaging with it more deeply. Alternate interpretations allow
              audiences to explore different emotional outcomes, character
              decisions, and thematic conclusions.
            </p>

            <p className="mb-6">
              This kind of creative engagement turns viewers into participants.
              Instead of passively consuming stories, audiences become storytellers
              themselves, reflecting on what resonated with them and what didn't.
            </p>
          </div>

          <div className="animate-fade-in-up stagger-5">
            <h2 className="text-2xl font-serif font-semibold mt-10 mb-4 text-gradient inline-block">
              Why Platforms Like Lumiere Exist
            </h2>

            <p className="mb-6">
              Lumiere exists to give space to these reflections. It's a place for
              cinephiles to share thoughtful alternate endings, explore different
              perspectives, and appreciate how powerful storytelling can be when
              seen through many lenses.
            </p>

            <p className="mb-6">
              By encouraging respectful, original reinterpretations, Lumiere helps
              celebrate cinema not just as entertainment, but as an evolving
              conversation between creators and audiences.
            </p>
          </div>

          <div className="glass-card p-6 mt-10 border-l-4 border-primary/40 animate-fade-in-up">
            <p className="text-muted-foreground italic">
              Cinema doesn't end when the credits roll. Sometimes, that's when the
              conversation truly begins.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
