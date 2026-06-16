import type { AnalysisResult } from "@/types/analysis";

// In production, call the backend directly by setting NEXT_PUBLIC_BACKEND_URL
// (e.g. your Hugging Face Space URL). Direct uploads avoid Vercel's 4.5 MB
// request-body limit and 60s function timeout. When it's unset (local dev),
// we fall back to the Next.js /api/analyze proxy route.
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");

/**
 * Uploads a PDF and returns the parsed analysis. Goes straight to the FastAPI
 * backend when NEXT_PUBLIC_BACKEND_URL is set, otherwise via the proxy route.
 */
export async function analyzePaper(
  file: File,
  signal?: AbortSignal,
): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append("file", file);

  const endpoint = BACKEND_URL ? `${BACKEND_URL}/analyze` : "/api/analyze";

  const response = await fetch(endpoint, {
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
