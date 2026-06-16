import { UploadCloud, ScanText, Sparkles } from "lucide-react";

const STEPS = [
  {
    icon: UploadCloud,
    title: "Drop in a PDF",
    body: "Upload any research paper. Papermind extracts and cleans the full text, then isolates the sections that carry the most meaning.",
  },
  {
    icon: ScanText,
    title: "Papermind reads it",
    body: "Transformer models summarize the paper, classify its domain, and surface its defining keywords — no manual skimming required.",
  },
  {
    icon: Sparkles,
    title: "Get usable insight",
    body: "Receive a tight summary, the research domain with a confidence score, key terms, and a ranked list of related papers to read next.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t bg-secondary/30">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            How it works
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight">
            From a dense PDF to clear insight in three steps
          </h2>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative">
              <div className="flex h-full flex-col rounded-2xl border bg-card p-7 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <step.icon className="size-6" />
                  </span>
                  <span className="font-serif text-3xl font-semibold text-muted-foreground/40">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
