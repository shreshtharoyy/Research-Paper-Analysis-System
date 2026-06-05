from pipeline.pdf_processing import extract_text_from_pdf, clean_text
from pipeline.document_analysis import analyze_document

text = extract_text_from_pdf("sample.pdf")
text = clean_text(text)

stats = analyze_document(text)
print(stats)