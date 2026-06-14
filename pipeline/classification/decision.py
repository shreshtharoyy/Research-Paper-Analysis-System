from .semantic.semantic_classifier import classify_paper_semantically
from .supervised.classifier import classify_paper

CONFIDENCE_THRESHOLD = 0.05


def classify(text: str) -> tuple[str, float]:

    semantic = classify_paper_semantically(text)
    supervised = classify_paper(text)

    if semantic["domain"] == supervised["domain"]:
        return (
            semantic["domain"],
            max(
                semantic["confidence"],
                supervised["confidence"],
            ),
        )

    confidence_gap = abs(
        semantic["confidence"] - supervised["confidence"]
    )

    if confidence_gap < CONFIDENCE_THRESHOLD:
        return (
            supervised["domain"],
            supervised["confidence"],
        )

    if semantic["confidence"] > supervised["confidence"]:
        return (
            semantic["domain"],
            semantic["confidence"],
        )

    return (
        supervised["domain"],
        supervised["confidence"],
    )