import type { AnalysisResult } from "@/types/analysis";

/**
 * Uploads a PDF to the Next.js proxy route, which forwards it to the
 * FastAPI backend's /analyze endpoint. Returns the parsed analysis.
 */
export async function analyzePaper(
  file: File,
  signal?: AbortSignal,
): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/analyze", {
    method: "POST",
    body: formData,
    signal,
  });

  if (!response.ok) {
    let message = `Analysis failed (${response.status}).`;
    try {
      const data = (await response.json()) as { error?: string; detail?: string };
      message = data.error ?? data.detail ?? message;
    } catch {
      // response had no JSON body; keep the default message
    }
    throw new Error(message);
  }

  return (await response.json()) as AnalysisResult;
}
