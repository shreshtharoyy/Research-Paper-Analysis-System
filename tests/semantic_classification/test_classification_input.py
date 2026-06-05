from pipeline.pdf_processing import extract_text_from_pdf, clean_text
from pipeline.chunking import chunk_text
from pipeline.classification.semantic.input_preparation import prepare_classification_input

text = extract_text_from_pdf("sample.pdf")
text = clean_text(text)

chunks = chunk_text(text)

classification_text = prepare_classification_input(chunks)

print(classification_text[:1000])