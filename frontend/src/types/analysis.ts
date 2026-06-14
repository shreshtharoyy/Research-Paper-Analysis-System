export interface Paper {
    paper_id: string;
    title: string;
    authors: string[];
    year: number | null;
    citation_count: number;
    abstract: string;
    paper_url: string;
}

export interface AnalysisResult {
    summary: string;
    domain: string;
    confidence: number;
    keywords: string[];
    recommended_papers: Paper[];
}