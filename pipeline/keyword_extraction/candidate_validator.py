from .model_loader import nlp

INVALID_POS = {
    "VERB",
    "AUX",
    "ADP",
    "CCONJ",
    "SCONJ",
    "DET",
    "PRON",
    "PART",
    "INTJ",
}


def is_valid_pos_pattern(candidate: str) -> bool:

    doc = nlp(candidate)
    if len(doc) == 0:
        return False

    for token in doc:
        if token.pos_ in INVALID_POS:
            return False

    if doc[-1].pos_ not in {"NOUN", "PROPN"}:
        return False

    return True

