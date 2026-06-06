CS_DOMAINS = [
    "Computer Vision",
    "Artificial Intelligence",
    "Systems and Control",
    "Computational Engineering",
    "Programming Languages",
    "Information Theory",
    "Data Structures and Algorithms",
    "Neural and Evolutionary Computing"
]


LABEL2ID = {
    label: idx
    for idx, label in enumerate(CS_DOMAINS)
}


ID2LABEL = {
    idx: label
    for label, idx in LABEL2ID.items()
}