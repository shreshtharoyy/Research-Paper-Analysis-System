from pipeline.pdf_processing import extract_text_from_pdf, clean_text
from pipeline.section_extraction import extract_abstract

from pipeline.keyword_extraction.candidate_generator import generate_candidates
from pipeline.keyword_extraction.candidate_validator import is_valid_pos_pattern

from pipeline.keyword_extraction.embedding import generate_embeddings
from pipeline.keyword_extraction.mmr import maximal_marginal_relevance

text = extract_text_from_pdf(
    "sample_papers/online_shopping_behavior.pdf"
)

text = clean_text(text)

abstract = extract_abstract(text)

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

print()

for keyword in keywords:

    print(keyword)