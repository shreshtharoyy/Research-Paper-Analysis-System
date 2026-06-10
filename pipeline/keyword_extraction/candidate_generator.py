from sklearn.feature_extraction.text import CountVectorizer

def is_validate_candidate(candidate: str) -> bool:
    words = candidate.split()

    if len(words)<2:
        return False
    if any(char.isdigit() for char in candidate):
        return False
    
    return True

def generate_candidates(text:str) -> list[str]:
    vectorizer = CountVectorizer(ngram_range=(2,3), stop_words="english", lowercase=True)

    vectorizer.fit([text])
    candidates = vectorizer.get_feature_names_out()
    
    cleaned_candidates = []

    for candidate in candidates:
        if is_validate_candidate(candidate):
            cleaned_candidates.append(candidate)

    return cleaned_candidates



