import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { countLeads, listLeads } from "@/lib/db";
import { LogoutButton } from "@/components/LogoutButton";

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value.includes("T") ? value : `${value}Z`));
  } catch {
    return value;
  }
}

export default async function AdminDashboardPage() {
  const ok = await isAuthenticated();
  if (!ok) {
    redirect("/admin");
  }

  const leads = listLeads();
  const total = countLeads();

  return (
    <main className="min-h-screen bg-ink px-5 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-lg font-bold text-ice">
              talento<span className="text-lime">cart</span>
            </p>
            <h1 className="font-display mt-3 text-3xl font-bold text-ice md:text-4xl">
              Leads dashboard
            </h1>
            <p className="mt-2 font-mono text-sm text-muted">
              {total} lead{total === 1 ? "" : "s"} captured from the contact form
            </p>
          </div>
          <div className="flex gap-3">
            <a href="/" className="btn-ghost px-4 py-2 text-sm">
              View site
            </a>
            <LogoutButton />
          </div>
        </div>

        {leads.length === 0 ? (
          <div className="mt-12 border border-dashed border-white/15 p-10 text-center">
            <p className="font-display text-xl text-ice">No leads yet</p>
            <p className="mt-2 text-muted">
              Submissions from the contact form will show up here.
            </p>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto border border-white/10">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-ink-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">When</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Message</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-t border-white/10 align-top odd:bg-ink-2/40"
                  >
                    <td className="whitespace-nowrap px-4 py-4 text-muted">
                      {formatDate(lead.created_at)}
                    </td>
                    <td className="px-4 py-4 font-medium text-ice">
                      {lead.name}
                    </td>
                    <td className="px-4 py-4">
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-lime hover:underline"
                      >
                        {lead.email}
                      </a>
                      {lead.phone ? (
                        <p className="mt-1 text-muted">{lead.phone}</p>
                      ) : null}
                    </td>
                    <td className="px-4 py-4 text-muted">
                      {lead.company || "—"}
                    </td>
                    <td className="px-4 py-4 text-muted">
                      {lead.service || "—"}
                    </td>
                    <td className="max-w-sm px-4 py-4 text-ice/90">
                      {lead.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
