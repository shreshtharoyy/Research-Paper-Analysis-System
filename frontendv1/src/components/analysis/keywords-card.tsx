import { Tags } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function KeywordsCard({ keywords }: { keywords: string[] }) {
  const items = keywords?.filter(Boolean) ?? [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Tags className="size-5" />
          </span>
          <div>
            <CardTitle>Keywords</CardTitle>
            <CardDescription>The terms that define this paper</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {items.map((keyword, i) => (
              <li
                key={`${keyword}-${i}`}
                className="rounded-full border border-primary/15 bg-primary/[0.07] px-3.5 py-1.5 text-sm font-medium text-primary"
              >
                {keyword}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No keywords extracted.</p>
        )}
      </CardContent>
    </Card>
  );
}
