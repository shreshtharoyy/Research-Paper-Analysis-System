CS_DOMAINS = [
    "Natural Language Processing",
    "Computer Vision",
    "Machine Learning",
    "Cyber Security",
    "Software Engineering",
    "Data Science",
    "Cloud Computing"
]


LABEL2ID = {
    label: idx
    for idx, label in enumerate(CS_DOMAINS)
}


ID2LABEL = {
    idx: label
    for label, idx in LABEL2ID.items()
}