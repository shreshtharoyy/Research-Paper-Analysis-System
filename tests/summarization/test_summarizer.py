from pipeline.pdf_processing import extract_text_from_pdf, clean_text
from pipeline.section_extraction import extract_abstract, extract_results, extract_conclusion, extract_limitations
from pipeline.summarization.summarizer import generate_summary

text = extract_text_from_pdf("sample.pdf")
text = clean_text(text)

summary_input = "\n\n".join(
    [
        extract_abstract(text),
        extract_results(text),
        extract_conclusion(text),
        extract_limitations(text)
    ]   
)

summary = generate_summary(summary_input)
print(summary)