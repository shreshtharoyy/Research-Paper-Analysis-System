from pipeline.pdf_processing import extract_text_from_pdf, clean_text
from pipeline.abstract_extraction import extract_abstract
from pipeline.classification.semantic.semantic_classifier import classify_paper_semantically

text = extract_text_from_pdf("sample4.pdf")
text = clean_text(text)

classification_text = extract_abstract(text)

domain, confidence = classify_paper_semantically(classification_text)

print(f"Domain: {domain}")
print(f"Confidence: {confidence:.4f}")