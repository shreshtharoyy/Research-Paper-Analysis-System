import { FileText, Compass, Tags, Library } from "lucide-react";

const CAPABILITIES = [
  {
    icon: FileText,
    title: "Abstractive summaries",
    body: "Section-aware summarization focuses on the abstract, results, conclusion, and limitations — then distills them into a few honest sentences.",
    note: "DistilBART",
  },
  {
    icon: Compass,
    title: "Domain classification",
    body: "Two models — a fine-tuned ModernBERT classifier and a semantic embedding classifier — agree on the paper's field and report their confidence.",
    note: "ModernBERT + BGE",
  },
  {
    icon: Tags,
    title: "Semantic keywords",
    body: "A from-scratch pipeline generates candidates, validates them by part-of-speech, and ranks them with MMR for relevance without redundancy.",
    note: "KeyBERT-style + spaCy",
  },
  {
    icon: Library,
    title: "Related papers",
    body: "Keywords become live scholarly queries against OpenAlex, ranked by relevance and citations — so you always know what to read next.",
    note: "OpenAlex API",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Capabilities
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight">
            Four answers, every time you upload
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Papermind doesn&apos;t guess. Each result comes from a dedicated,
            inspectable stage of the analysis pipeline.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="group rounded-2xl border bg-card p-7 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <cap.icon className="size-6" />
                </span>
                <span className="rounded-full border px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {cap.note}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{cap.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {cap.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
