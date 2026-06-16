import Link from "next/link";
import { Logo } from "@/components/brand/logo";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">
            Read less, understand more. Papermind turns dense research papers
            into clear, citable insight.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:items-end">
          <Link href="/analyze" className="transition-colors hover:text-foreground">
            Analyze a paper
          </Link>
          <Link href="/#how-it-works" className="transition-colors hover:text-foreground">
            How it works
          </Link>
          <span className="text-xs">
            © {new Date().getFullYear()} Papermind
          </span>
        </div>
      </div>
    </footer>
  );
}
