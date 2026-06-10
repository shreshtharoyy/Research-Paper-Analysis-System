from pipeline.pdf_processing import extract_text_from_pdf, clean_text
from pipeline.section_extraction import extract_abstract
from pipeline.keyword_extraction.extractor import extract_keywords

text = extract_text_from_pdf("sample_papers/object_detection_yolo.pdf")
text = clean_text(text)
abstarct_text = extract_abstract(text)
keywords = extract_keywords(abstarct_text)

print(keywords)

