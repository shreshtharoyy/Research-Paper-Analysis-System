from pipeline.pdf_processing import extract_text_from_pdf, clean_text
from pipeline.section_extraction import extract_abstract
from pipeline.classification.decision import classify


text = extract_text_from_pdf("sample_papers/object_detection_yolo.pdf")

text = clean_text(text)

abstract = extract_abstract(text)

domain = classify(abstract)

print("Final Domain:")
print(domain)