import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CtaBand() {
  return (
    <section className="px-5 pb-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border bg-primary px-8 py-16 text-center text-primary-foreground">
        <div className="paper-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-serif text-4xl font-semibold tracking-tight">
            Your next paper, already understood.
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Stop skimming abstracts and chasing citations by hand. Let Papermind
            do the first read for you.
          </p>
          <Link
            href="/analyze"
            className={cn(
              buttonVariants({ size: "lg" }),
              "group mt-8 bg-background text-foreground hover:bg-background/90",
            )}
          >
            Analyze a paper
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
