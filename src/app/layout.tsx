import type { Metadata } from "next";
import { JetBrains_Mono, Outfit, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Talentocart | Engineers on demand",
  description:
    "Talentocart helps companies hire software engineers across every tech stack, provide on-demand developers, deliver software services, and run India payroll without the overhead.",
  keywords: [
    "Talentocart",
    "hire software engineers",
    "on-demand developers",
    "India payroll",
    "software services",
    "Noida",
    "Ghaziabad",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-ice">{children}</body>
    </html>
  );
}
