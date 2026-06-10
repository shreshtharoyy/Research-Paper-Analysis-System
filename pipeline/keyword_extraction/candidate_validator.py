from .model_loader import nlp
def is_valid_pos_pattern(candidate: str) -> bool:

    doc = nlp(candidate)
    pos_tags = [token.pos_ for token in doc]

    valid_patterns = [
        ["NOUN", "NOUN"],
        ["ADJ", "NOUN"],
        ["ADJ", "NOUN", "NOUN"],
        ["NOUN", "NOUN", "NOUN"],
    ]

    return pos_tags in valid_patterns