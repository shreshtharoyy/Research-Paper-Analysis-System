def analyze_document(text: str) -> dict:
    word_count = len(text.split())

    character_count = len(text)

    return {
        "word_count": word_count,
        "character_count": character_count
    }