"use client";

import * as React from "react";
import { Check, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const STAGES = [
  "Extracting text from the PDF",
  "Isolating the key sections",
  "Writing an abstractive summary",
  "Classifying the research domain",
  "Extracting semantic keywords",
  "Finding related papers",
];

export function AnalyzingState({ fileName }: { fileName?: string }) {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    // Advance through stages as a progress indication. The last stage
    // (related papers) holds until the real response arrives.
    const id = setInterval(() => {
      setActive((prev) => Math.min(prev + 1, STAGES.length - 1));
    }, 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Loader2 className="size-4 animate-spin text-primary" />
            Analyzing{fileName ? ` ${fileName}` : ""}…
          </div>
          <ol className="mt-6 space-y-4">
            {STAGES.map((stage, i) => {
              const done = i < active;
              const current = i === active;
              return (
                <li key={stage} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs transition-colors",
                      done && "border-primary bg-primary text-primary-foreground",
                      current && "border-primary text-primary",
                      !done && !current && "border-border text-muted-foreground",
                    )}
                  >
                    {done ? (
                      <Check className="size-3.5" />
                    ) : current ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-sm transition-colors",
                      current ? "font-medium text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {stage}
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="mt-6 text-xs text-muted-foreground">
            First runs can take a little longer while the local models warm up.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-5">
        <Card>
          <CardContent className="space-y-3 pt-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-[94%]" />
            <Skeleton className="h-3 w-[80%]" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3 pt-6">
            <Skeleton className="h-4 w-28" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-7 w-20 rounded-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
