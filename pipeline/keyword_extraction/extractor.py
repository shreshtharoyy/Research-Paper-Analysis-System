from .model_loader import model

def extract_keywords(text:str) -> list[str]:
    keywords = model.extract_keywords(text, keyphrase_ngram_range=(2,3), stop_words="english", top_n=10, use_mmr = True, diversity=0.7)

    extracted_keywords = []

    for keyword in keywords:
        if isinstance(keyword, tuple):
            extracted_keywords.append(keyword[0])
        else:
            extracted_keywords.append(keyword)

    return extracted_keywords