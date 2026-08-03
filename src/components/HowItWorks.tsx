const steps = [
  {
    n: "01",
    title: "Tell us the brief",
    copy: "Share the role, stack, timeline, or payroll need. We shape a clear hiring or delivery plan.",
  },
  {
    n: "02",
    title: "We match & assemble",
    copy: "Get vetted engineers, on-demand capacity, or a delivery squad aligned to your stack and pace.",
  },
  {
    n: "03",
    title: "Start shipping",
    copy: "Plug talent into your workflow — or let us run India employment while you stay focused on product.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-y border-white/10 bg-ink-2/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan">
          How it works
        </p>
        <h2 className="font-display mt-4 max-w-2xl text-4xl font-bold tracking-tight text-ice md:text-5xl">
          From brief to bench in a few sharp steps.
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step) => (
            <div key={step.n} className="relative">
              <div className="font-display text-5xl font-extrabold text-lime/25">
                {step.n}
              </div>
              <h3 className="font-display mt-4 text-xl font-bold text-ice">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
