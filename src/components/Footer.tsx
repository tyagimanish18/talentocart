export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-lg font-bold text-ice">
            talento<span className="text-lime">cart</span>
          </p>
          <p className="mt-1 text-sm text-muted">
            Hiring · On-demand engineers · Software services · India payroll
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-sm text-muted">
          <a href="mailto:info@talentocart.com" className="hover:text-lime">
            info@talentocart.com
          </a>
          <a href="tel:+919927082079" className="hover:text-lime">
            +91 99270 82079
          </a>
          <a href="/admin" className="hover:text-lime">
            Admin
          </a>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl px-5 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted/70">
          © {new Date().getFullYear()} Talentocart · Noida · Ghaziabad
        </p>
      </div>
    </footer>
  );
}
