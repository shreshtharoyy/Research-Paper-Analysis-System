from pipeline.pdf_processing import extract_text_from_pdf, clean_text

pdf_text = extract_text_from_pdf("sample.pdf")

print(clean_text(pdf_text[:1000]))