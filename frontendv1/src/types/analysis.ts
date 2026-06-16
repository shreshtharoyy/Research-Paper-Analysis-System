/**
 * Mirrors the FastAPI response models in
 * pipeline/recommendations/models.py and pipeline/analysis_result.py.
 */

export interface Paper {
  paper_id: string;
  title: string;
  authors: string[];
  year: number | null;
  citation_count: number | null;
  abstract: string | null;
  paper_url: string | null;
}

export interface AnalysisResult {
  summary: string;
  domain: string;
  confidence: number;
  keywords: string[];
  recommended_papers: Paper[];
}
