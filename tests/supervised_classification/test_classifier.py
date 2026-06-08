from pipeline.classification.supervised.classifier import classify_paper
from pipeline.pdf_processing import extract_text_from_pdf, clean_text
from pipeline.abstract_extraction import extract_abstract

text = extract_text_from_pdf("sample4.pdf")
text = clean_text(text)
abstract = extract_abstract(text)

result = classify_paper(abstract)
print(result)