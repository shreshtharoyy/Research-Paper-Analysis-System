from pipeline.recommendations.openalex import OpenAlexClient
from pipeline.pdf_processing import extract_text_from_pdf, clean_text
from pipeline.section_extraction import extract_abstract

from pipeline.keyword_extraction.candidate_generator import generate_candidates
from pipeline.keyword_extraction.candidate_validator import is_valid_pos_pattern
from pipeline.keyword_extraction.embedding import generate_embeddings
from pipeline.keyword_extraction.mmr import maximal_marginal_relevance


# --------------------------------------------------
# PDF Processing
# --------------------------------------------------

text = extract_text_from_pdf(
    "sample_papers/online_shopping_behavior.pdf"
)

text = clean_text(text)

abstract = extract_abstract(text)


# --------------------------------------------------
# Keyword Extraction
# --------------------------------------------------

candidates = generate_candidates(abstract)

valid_candidates = [
    candidate
    for candidate in candidates
    if is_valid_pos_pattern(candidate)
]

document_embedding = generate_embeddings([abstract])

candidate_embeddings = generate_embeddings(valid_candidates)

keywords = maximal_marginal_relevance(
    document_embedding=document_embedding,
    candidate_embeddings=candidate_embeddings,
    candidates=valid_candidates,
    top_n=10,
    diversity=0.7
)

search_keywords = keywords[:6]

print("Search Keywords:")
print(search_keywords)
print()


# --------------------------------------------------
# Recommendation
# --------------------------------------------------

client = OpenAlexClient()

recommended_papers = {}

search_queries = [
    " ".join(search_keywords[i:i + 2])
    for i in range(0, len(search_keywords), 2)
]

print("Search Queries:")
print(search_queries)
print()


recommended_papers = {}

for query in search_queries:

    print(f"Searching papers for: {query}")

    papers = client.search_papers(query)

    print(f"Found {len(papers)} papers\n")

    for paper in papers:

        if paper.paper_id not in recommended_papers:

            recommended_papers[paper.paper_id] = {
                "paper": paper,
                "matches": 1
            }

        else:

            recommended_papers[paper.paper_id]["matches"] += 1


# --------------------------------------------------
# Ranking
# --------------------------------------------------

ranked_papers = sorted(
    recommended_papers.values(),
    key=lambda item: (
        item["matches"],
        item["paper"].citation_count
    ),
    reverse=True
)

ranked_papers = ranked_papers[:10]


# --------------------------------------------------
# Results
# --------------------------------------------------

print("=" * 80)
print(f"Top {len(ranked_papers)} Recommended Papers")
print("=" * 80)

for item in ranked_papers:

    paper = item["paper"]

    print(f"Matched Keywords : {item['matches']}")
    print(f"Title            : {paper.title}")
    print(f"Authors          : {', '.join(paper.authors)}")
    print(f"Year             : {paper.year}")
    print(f"Citations        : {paper.citation_count}")
    print(f"URL              : {paper.paper_url}")
    print(f"Abstract         : {(paper.abstract or '')[:200]}...")
    print("-" * 80)