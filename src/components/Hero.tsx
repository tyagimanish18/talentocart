export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden pt-24"
    >
      <div className="pointer-events-none absolute inset-0 hero-glow" />
      <div className="pointer-events-none absolute inset-0 site-grid" />

      <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[55%]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(184,240,0,0.12),transparent_45%)]" />
        <div className="animate-drift absolute right-[-8%] top-[12%] h-[70%] w-[90%] border border-lime/20 bg-[linear-gradient(145deg,rgba(19,38,54,0.85),rgba(6,16,24,0.4))]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="scan-beam absolute inset-x-8 h-24 bg-gradient-to-b from-transparent via-lime/20 to-transparent" />
          </div>
          <div className="absolute left-8 top-8 space-y-3 font-mono text-[11px] text-cyan/80 md:left-12 md:top-12 md:text-xs">
            <p className="animate-pulse-line">{"// talent pipeline online"}</p>
            <p>stack.match = true</p>
            <p>latency.hire = &quot;on-demand&quot;</p>
            <p className="text-lime">status: recruiting_ready</p>
          </div>
          <div className="absolute bottom-10 left-8 right-8 grid grid-cols-3 gap-3 md:bottom-14 md:left-12 md:right-12">
            {["React", "Node", "Java", "Python", "DevOps", "AI/ML"].map(
              (stack) => (
                <div
                  key={stack}
                  className="border border-white/10 bg-ink/50 px-3 py-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-ice/80 md:text-xs"
                >
                  {stack}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl flex-col justify-center px-5 pb-20 md:px-8">
        <div className="max-w-xl">
          <p className="animate-rise font-mono text-xs uppercase tracking-[0.28em] text-lime">
            Talentocart
          </p>
          <h1 className="animate-rise-delay-1 font-display mt-5 text-5xl font-extrabold leading-[0.95] tracking-tight text-ice sm:text-6xl md:text-7xl">
            Engineers,
            <br />
            <span className="text-lime">on demand.</span>
          </h1>
          <p className="animate-rise-delay-2 mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
            Hire software engineers across every stack, scale with on-demand
            developers, ship product with our engineering teams — or run India
            payroll without the overhead.
          </p>
          <div className="animate-rise-delay-3 mt-9 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">
              Request talent
            </a>
            <a href="#services" className="btn-ghost">
              Explore services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
