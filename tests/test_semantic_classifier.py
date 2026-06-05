from pipeline.pdf_processing import extract_text_from_pdf, clean_text

from pipeline.chunking import chunk_text

from pipeline.classification.input_preparation import prepare_classification_input

from pipeline.classification.semantic_classifier import classify_paper_semantically

text = extract_text_from_pdf("sample.pdf")
text = clean_text(text)

chunks = chunk_text(text)

classification_text = prepare_classification_input(chunks)

domain, confidence = classify_paper_semantically(classification_text)

print(f"Domain: {domain}")
print(f"Confidence: {confidence:.4f}")