"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* ambient background */}
      <div className="paper-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <Badge variant="outline" className="gap-1.5 bg-card/60">
              <Sparkles className="size-3.5 text-primary" />
              Research, distilled
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.05 }}
            className="mt-5 font-serif text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
          >
            Read less.
            <br />
            <span className="text-primary">Understand more.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.12 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Drop in any research paper. Papermind reads it end to end and hands
            you a clear summary, its research domain, the keywords that matter,
            and the related work worth reading next.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.18 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/analyze"
              className={cn(buttonVariants({ size: "lg" }), "group")}
            >
              Analyze a paper
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/#how-it-works"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              See how it works
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className="mt-6 text-sm text-muted-foreground"
          >
            No sign-up. PDFs are analyzed on your own backend — nothing is stored
            in the cloud.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="relative"
        >
          <HeroPreview />
        </motion.div>
      </div>
    </section>
  );
}

/** An abstract preview of the analysis output — structural, not fabricated data. */
function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/10 via-transparent to-highlight/10 blur-xl" />
      <div className="relative space-y-4 rounded-2xl border bg-card/90 p-5 shadow-xl backdrop-blur">
        <div className="flex items-center gap-3 border-b pb-4">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="h-2.5 w-2/3 rounded-full bg-foreground/20" />
            <div className="mt-2 h-2 w-1/3 rounded-full bg-foreground/10" />
          </div>
          <Badge className="shrink-0">Analyzed</Badge>
        </div>

        <PreviewBlock label="Summary">
          <div className="space-y-2">
            <div className="h-2 w-full rounded-full bg-foreground/12" />
            <div className="h-2 w-[92%] rounded-full bg-foreground/12" />
            <div className="h-2 w-[78%] rounded-full bg-foreground/12" />
          </div>
        </PreviewBlock>

        <div className="grid grid-cols-2 gap-3">
          <PreviewBlock label="Domain">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              <div className="h-2.5 w-20 rounded-full bg-foreground/20" />
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[86%] rounded-full bg-primary" />
            </div>
          </PreviewBlock>
          <PreviewBlock label="Keywords">
            <div className="flex flex-wrap gap-1.5">
              {[14, 20, 11, 16, 12].map((w, i) => (
                <span
                  key={i}
                  className="h-5 rounded-full bg-primary/10"
                  style={{ width: `${w * 4}px` }}
                />
              ))}
            </div>
          </PreviewBlock>
        </div>

        <PreviewBlock label="Related papers">
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="size-8 shrink-0 rounded-md bg-highlight/15" />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="h-2 w-3/4 rounded-full bg-foreground/15" />
                  <div className="h-1.5 w-1/2 rounded-full bg-foreground/10" />
                </div>
              </div>
            ))}
          </div>
        </PreviewBlock>
      </div>
    </div>
  );
}

function PreviewBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-background/60 p-4">
      <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  );
}
