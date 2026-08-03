"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Login failed");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-5 py-16">
      <div className="pointer-events-none absolute inset-0 hero-glow" />
      <div className="pointer-events-none absolute inset-0 site-grid opacity-60" />

      <div className="relative w-full max-w-md border border-white/10 bg-ink-2/80 p-8 backdrop-blur">
        <Link
          href="/"
          className="font-display text-lg font-bold text-ice hover:text-lime"
        >
          talento<span className="text-lime">cart</span>
        </Link>
        <h1 className="font-display mt-6 text-3xl font-bold text-ice">
          Admin login
        </h1>
        <p className="mt-2 text-sm text-muted">
          Sign in to view contact form leads.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              autoComplete="username"
              className="input-field"
              placeholder="info@talentocart.com"
            />
          </label>
          <label className="block">
            <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Password
            </span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="input-field"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-2 w-full disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {error && (
            <p className="font-mono text-sm text-danger">{error}</p>
          )}
        </form>
      </div>
    </main>
  );
}
