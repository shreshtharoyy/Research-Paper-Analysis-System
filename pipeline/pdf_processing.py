import fitz
import re

def extract_text_from_pdf(pdf_path: str) -> str:
    pages = []

    try:
        with fitz.open(pdf_path) as pdf:
            for page in pdf:
                pages.append(page.get_text())

        return "".join(pages)
    
    except Exception as e:
        raise RuntimeError(
            f"Error while processing PDF: {e}"
        )

def clean_text(text: str) -> str:
    text = re.sub(r"\s+"," ", text)

    return text.strip()
