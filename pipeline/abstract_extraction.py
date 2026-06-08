def extract_abstract(text: str) -> str:
    text_lower = text.lower()
    start = text_lower.find("abstract")
    
    if start == -1:
        return text
    end = text_lower.find("introduction", start)

    if end == -1:
        return text[start:start + 2000]

    return text[start:end]