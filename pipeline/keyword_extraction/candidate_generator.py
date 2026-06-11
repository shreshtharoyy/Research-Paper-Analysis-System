from sklearn.feature_extraction.text import CountVectorizer

def generate_candidates(text:str) -> list[str]:
    vectorizer = CountVectorizer(ngram_range=(2,3), stop_words="english", lowercase=True, token_pattern=r"(?u)\b[A-Za-z][A-Za-z-]+\b",
        max_features=300)

    vectorizer.fit([text])
    candidates = vectorizer.get_feature_names_out().tolist()

    cleaned_candidates = []

    for candidate in candidates:

        if len(candidate.split()) > 3:
            continue
        if len(candidate) < 3:
            continue

        cleaned_candidates.append(candidate)

    return cleaned_candidates 
