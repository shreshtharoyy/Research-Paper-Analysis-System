from pipeline.pdf_processing import extract_text_from_pdf, clean_text
from pipeline.section_extraction import extract_abstract

from pipeline.keyword_extraction.candidate_generator import generate_candidates
from pipeline.keyword_extraction.candidate_validator import is_valid_pos_pattern

from pipeline.keyword_extraction.embedding import generate_embeddings
from pipeline.keyword_extraction.similarity import compute_similarity


text = extract_text_from_pdf("sample_papers/object_detection_yolo.pdf")

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

scores = compute_similarity(document_embedding, candidate_embeddings)

ranked_candidates = sorted(
    zip(valid_candidates, scores.tolist()),
    key=lambda x: x[1],
    reverse=True
)

for candidate, score in ranked_candidates[:20]:
    print(f"{candidate:} {score:.4f}")