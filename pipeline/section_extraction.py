def extract_section(text: str, start_heading: str, end_headings: list[str]) -> str:
    text_lower = text.lower()
    start = text_lower.find(start_heading.lower())

    if start == -1:
        return ""
    
    end = len(text)

    for heading in end_headings:
        position = text_lower.find(heading.lower(), start)

        if position != -1:
            end = min(end, position)

    return text[start:end].strip()

def extract_abstract(text: str) -> str:
    return extract_section(
        text,
        "abstract",
        [
            "introduction"
        ]
    )


def extract_results(text: str) -> str:
    return extract_section(
        text,
        "results",
        [
            "discussion",
            "conclusion",
            "limitations",
            "future work",
            "references"
        ]
    )


def extract_conclusion(text: str) -> str:
    return extract_section(
        text,
        "conclusion",
        [
            "limitations",
            "future work",
            "references"
        ]
    )


def extract_limitations(text: str) -> str:
    return extract_section(
        text,
        "limitations",
        [
            "future work",
            "references"
        ]
    )