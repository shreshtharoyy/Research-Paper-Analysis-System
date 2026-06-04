def prepare_classification_input(chunks : list[str]) -> str:
    return " ".join(chunks[:2])