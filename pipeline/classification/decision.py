from .semantic.semantic_classifier import classify_paper_semantically
from .supervised.classifier import classify_paper

CONFIDENCE_THRESHOLD = 0.05


def classify(text: str) -> str:

    semantic = classify_paper_semantically(text)
    supervised = classify_paper(text)

    if semantic["domain"] == supervised["domain"]:
        return semantic["domain"]

    confidence_gap = abs(
        semantic["confidence"] - supervised["confidence"]
    )

    if confidence_gap < CONFIDENCE_THRESHOLD:
        return supervised["domain"]

    if semantic["confidence"] > supervised["confidence"]:
        return semantic["domain"]

    return supervised["domain"]