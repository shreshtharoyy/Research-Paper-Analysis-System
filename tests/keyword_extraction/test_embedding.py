from pipeline.pdf_processing import extract_text_from_pdf, clean_text
from pipeline.section_extraction import extract_abstract

from pipeline.keyword_extraction.candidate_generator import generate_candidates
from pipeline.keyword_extraction.candidate_validator import is_valid_pos_pattern
from pipeline.keyword_extraction.embedding import generate_embeddings


text = extract_text_from_pdf("sample_papers/object_detection_yolo.pdf")
text = clean_text(text)

abstract = extract_abstract(text)

candidates = generate_candidates(abstract)

valid_candidates = []

for candidate in candidates:
    if is_valid_pos_pattern(candidate):
        valid_candidates.append(candidate)

document_embedding = generate_embeddings([abstract])
candidate_embeddings = generate_embeddings(valid_candidates)

print(f"Total Candidates : {len(candidates)}")
print(f"Valid Candidates : {len(valid_candidates)}")
print()

print(type(document_embedding))
print(type(candidate_embeddings))
print()

print(f"Document Embedding Shape : {document_embedding.shape}")
print(f"Candidate Embeddings Shape : {candidate_embeddings.shape}")