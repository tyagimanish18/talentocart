const stacks = [
  "React / Next.js",
  "Node.js",
  "Python / Django",
  "Java / Spring",
  "Go",
  ".NET",
  "Flutter",
  "React Native",
  "AWS / GCP / Azure",
  "Kubernetes",
  "Data Engineering",
  "AI / ML",
];

export function Stacks() {
  return (
    <section id="stacks" className="relative overflow-hidden py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,230,214,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-lime">
              Tech stacks
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-ice md:text-5xl">
              Every stack. One talent network.
            </h2>
          </div>
          <p className="max-w-sm text-muted">
            Frontend, backend, mobile, cloud, data, and AI — matched to how your
            product actually ships.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {stacks.map((stack) => (
            <span
              key={stack}
              className="border border-white/10 bg-ink-2/80 px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-ice/90 transition hover:border-lime/50 hover:text-lime"
            >
              {stack}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
