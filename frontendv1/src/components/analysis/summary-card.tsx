import { FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SummaryCard({ summary }: { summary: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="size-5" />
          </span>
          <div>
            <CardTitle>Summary</CardTitle>
            <CardDescription>
              Distilled from the paper&apos;s key sections
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-pretty text-[0.975rem] leading-relaxed text-foreground/90">
          {summary?.trim() || "No summary could be generated for this document."}
        </p>
      </CardContent>
    </Card>
  );
}
