"use client";

import * as React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { analyzePaper } from "@/lib/api";
import type { AnalysisResult } from "@/types/analysis";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "./upload-dropzone";
import { AnalyzingState } from "./analyzing-state";
import { ResultView } from "./result-view";

type Status = "idle" | "analyzing" | "done" | "error";

export function Analyzer() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [result, setResult] = React.useState<AnalysisResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState<string | undefined>();

  const run = React.useCallback(async (file: File) => {
    setFileName(file.name);
    setStatus("analyzing");
    setError(null);
    setResult(null);
    try {
      const data = await analyzePaper(file);
      setResult(data);
      setStatus("done");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while analyzing the paper.",
      );
      setStatus("error");
    }
  }, []);

  const reset = () => {
    setStatus("idle");
    setResult(null);
    setError(null);
    setFileName(undefined);
  };

  return (
    <div>
      {status === "idle" && <UploadDropzone onAnalyze={run} />}

      {status === "analyzing" && <AnalyzingState fileName={fileName} />}

      {status === "error" && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="size-6" />
          </span>
          <h2 className="mt-4 text-lg font-semibold">Analysis failed</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            {error}
          </p>
          <p className="mx-auto mt-1 max-w-md text-xs text-muted-foreground">
            Make sure the backend is running at the configured address, then try
            again.
          </p>
          <Button onClick={reset} variant="outline" className="mt-6">
            Try another paper
          </Button>
        </div>
      )}

      {status === "done" && result && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Analysis of</p>
              <p className="truncate font-serif text-xl font-semibold">
                {fileName ?? "your paper"}
              </p>
            </div>
            <Button onClick={reset} variant="outline">
              <RotateCcw className="size-4" />
              Analyze another
            </Button>
          </div>
          <ResultView result={result} />
        </div>
      )}
    </div>
  );
}
