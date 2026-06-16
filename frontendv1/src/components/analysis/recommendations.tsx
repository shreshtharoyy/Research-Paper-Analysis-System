import { ArrowUpRight, Library, Quote, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Paper } from "@/types/analysis";

function formatAuthors(authors: string[]): string {
  if (!authors || authors.length === 0) return "Unknown authors";
  if (authors.length <= 3) return authors.join(", ");
  return `${authors.slice(0, 3).join(", ")} +${authors.length - 3}`;
}

function formatCitations(count: number | null): string | null {
  if (count === null || count === undefined) return null;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
}

function PaperRow({ paper }: { paper: Paper }) {
  const citations = formatCitations(paper.citation_count);
  const content = (
    <article className="group flex h-full flex-col rounded-xl border bg-background/40 p-5 transition-colors hover:border-primary/40 hover:bg-accent/40">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium leading-snug text-foreground group-hover:text-primary">
          {paper.title || "Untitled paper"}
        </h3>
        {paper.paper_url && (
          <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
        )}
      </div>

      {paper.abstract && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {paper.abstract}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Users className="size-3.5" />
          {formatAuthors(paper.authors)}
        </span>
        {paper.year && <span className="tabular-nums">{paper.year}</span>}
        {citations && (
          <span className="inline-flex items-center gap-1.5 tabular-nums">
            <Quote className="size-3.5" />
            {citations} citations
          </span>
        )}
      </div>
    </article>
  );

  if (!paper.paper_url) return content;

  return (
    <a
      href={paper.paper_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {content}
    </a>
  );
}

export function Recommendations({ papers }: { papers: Paper[] }) {
  const items = papers ?? [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Library className="size-5" />
          </span>
          <div>
            <CardTitle>Related papers</CardTitle>
            <CardDescription>
              {items.length > 0
                ? `${items.length} papers worth reading next, from OpenAlex`
                : "Discovered from your paper's keywords"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((paper) => (
              <PaperRow key={paper.paper_id} paper={paper} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No related papers were found for this document.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
