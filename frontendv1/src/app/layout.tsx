import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Papermind — Understand any research paper in minutes",
    template: "%s · Papermind",
  },
  description:
    "Papermind reads dense research papers and returns a clear summary, its research domain, the keywords that matter, and related papers worth reading next.",
  keywords: [
    "research papers",
    "paper summarizer",
    "academic AI",
    "literature review",
    "NLP",
  ],
  openGraph: {
    title: "Papermind",
    description:
      "Understand any research paper in minutes — summary, domain, keywords, and related work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${fraunces.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
