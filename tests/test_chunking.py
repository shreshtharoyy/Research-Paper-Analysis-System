from pipeline.pdf_processing import extract_text_from_pdf, clean_text
from pipeline.chunking import chunk_text

text = extract_text_from_pdf("sample.pdf")
text = clean_text(text)
chunks = chunk_text(text)

print(f"Total Chunks: {len(chunks)}")
print()

print(chunks[0][:500])

