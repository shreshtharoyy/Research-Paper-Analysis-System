from pathlib import Path

from pipeline.analysis_result import AnalysisResult

from pipeline.pdf_processing import (
    extract_text_from_pdf,
    clean_text,
)

from pipeline.section_extraction import (
    extract_abstract,
    extract_results,
    extract_conclusion,
    extract_limitations,
)

from pipeline.summarization.summarizer import generate_summary

from pipeline.classification.decision import classify

from pipeline.keyword_extraction.candidate_generator import (
    generate_candidates,
)
from pipeline.keyword_extraction.candidate_validator import (
    is_valid_pos_pattern,
)
from pipeline.keyword_extraction.embedding import (
    generate_embeddings,
)
from pipeline.keyword_extraction.mmr import (
    maximal_marginal_relevance,
)

from pipeline.recommendations.openalex import OpenAlexClient


class AnalysisPipeline:

    def __init__(self) -> None:
        self.recommendation_client = OpenAlexClient()

    def run(self, pdf_path: Path) -> AnalysisResult:

        text = extract_text_from_pdf(str(pdf_path))
        cleaned_text = clean_text(text)

        abstract = extract_abstract(cleaned_text)
        results = extract_results(cleaned_text)
        conclusion = extract_conclusion(cleaned_text)
        limitations = extract_limitations(cleaned_text)

        summary_input = "\n\n".join(
            [
                abstract,
                results,
                conclusion,
                limitations,
            ]
        )

        summary = generate_summary(summary_input)

        classification = classify(abstract)

        domain, confidence = classify(abstract)

        candidates = generate_candidates(abstract)

        valid_candidates = [
            candidate
            for candidate in candidates
            if is_valid_pos_pattern(candidate)
        ]

        document_embedding = generate_embeddings([abstract])

        candidate_embeddings = generate_embeddings(
            valid_candidates
        )

        keywords = maximal_marginal_relevance(
            document_embedding=document_embedding,
            candidate_embeddings=candidate_embeddings,
            candidates=valid_candidates,
            top_n=10,
            diversity=0.7,
        )

        search_keywords = keywords[:6]

        search_queries = [
            " ".join(search_keywords[i:i + 2])
            for i in range(0, len(search_keywords), 2)
        ]

        recommended_papers = {}

        for query in search_queries:

            papers = self.recommendation_client.search_papers(
                query
            )

            for paper in papers:

                if paper.paper_id not in recommended_papers:

                    recommended_papers[paper.paper_id] = {
                        "paper": paper,
                        "matches": 1,
                    }

                else:

                    recommended_papers[paper.paper_id][
                        "matches"
                    ] += 1

        ranked_papers = sorted(
            recommended_papers.values(),
            key=lambda item: (
                item["matches"],
                item["paper"].citation_count,
            ),
            reverse=True,
        )

        ranked_papers = ranked_papers[:10]

        papers = [
            item["paper"]
            for item in ranked_papers
        ]


        return AnalysisResult(
            summary=summary,
            domain=domain,
            confidence=confidence,
            keywords=keywords,
            recommended_papers=papers,
        )
    
if __name__ == "__main__":

    pipeline = AnalysisPipeline()

    result = pipeline.run(
        Path("sample_papers/online_shopping_behavior.pdf")
    )

    print(result.model_dump())