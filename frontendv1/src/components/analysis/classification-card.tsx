import { Compass } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function confidenceLabel(pct: number) {
  if (pct >= 75) return "High confidence";
  if (pct >= 50) return "Moderate confidence";
  return "Low confidence";
}

export function ClassificationCard({
  domain,
  confidence,
}: {
  domain: string;
  confidence: number;
}) {
  // confidence arrives as a 0..1 score; clamp defensively before display.
  const pct = Math.round(Math.min(Math.max(confidence ?? 0, 0), 1) * 100);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Compass className="size-5" />
          </span>
          <div>
            <CardTitle>Research domain</CardTitle>
            <CardDescription>Predicted field of study</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-serif text-2xl font-semibold tracking-tight">
          {domain?.trim() || "Unclassified"}
        </p>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{confidenceLabel(pct)}</span>
            <span className="font-medium tabular-nums">{pct}%</span>
          </div>
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Classification confidence"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
