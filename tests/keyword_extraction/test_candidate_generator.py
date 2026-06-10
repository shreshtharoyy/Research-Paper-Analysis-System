from pipeline.pdf_processing import extract_text_from_pdf, clean_text
from pipeline.section_extraction import extract_abstract
from pipeline.keyword_extraction.candidate_generator import generate_candidates

text = extract_text_from_pdf("sample_papers/object_detection_yolo.pdf")
text = clean_text(text)

abstract = extract_abstract(text)

candidates = generate_candidates(abstract)

print(candidates)
print(len(candidates))