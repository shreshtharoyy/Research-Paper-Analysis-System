import type { AnalysisResult } from "@/types/analysis";
import { SummaryCard } from "./summary-card";
import { ClassificationCard } from "./classification-card";
import { KeywordsCard } from "./keywords-card";
import { Recommendations } from "./recommendations";

export function ResultView({ result }: { result: AnalysisResult }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SummaryCard summary={result.summary} />
        </div>
        <ClassificationCard
          domain={result.domain}
          confidence={result.confidence}
        />
      </div>

      <KeywordsCard keywords={result.keywords} />

      <Recommendations papers={result.recommended_papers} />
    </div>
  );
}
