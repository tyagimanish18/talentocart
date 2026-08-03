const services = [
  {
    code: "01",
    title: "Tech hiring",
    copy: "We source and place software engineers across every major stack — from product squads to specialized roles.",
  },
  {
    code: "02",
    title: "On-demand developers",
    copy: "Spin up vetted engineers quickly when you need bandwidth, without long hiring cycles or permanent headcount.",
  },
  {
    code: "03",
    title: "Software services",
    copy: "From architecture to delivery, our teams build, modernize, and maintain products with production-grade engineering.",
  },
  {
    code: "04",
    title: "India payroll partner",
    copy: "Hire talent in India without running local payroll ops — we handle employer-of-record and compliance overhead.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan">
            What we do
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-ice md:text-5xl">
            Built for companies that ship software.
          </h2>
          <p className="mt-4 text-muted md:text-lg">
            One partner for hiring, flexible engineering capacity, delivery, and
            India payroll.
          </p>
        </div>

        <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.code}
              className="group bg-ink-2 p-8 transition duration-300 hover:bg-ink-3 md:p-10"
            >
              <p className="font-mono text-xs text-lime">{service.code}</p>
              <h3 className="font-display mt-5 text-2xl font-bold text-ice transition group-hover:text-lime">
                {service.title}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">
                {service.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
