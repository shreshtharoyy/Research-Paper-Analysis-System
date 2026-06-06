from datasets import load_dataset

def load_arxiv_dataset():
    return load_dataset("ccdv/arxiv-classification")

def filter_cs_categories(dataset):

    allowed_labels = {
        1,  # cs.CV
        2,  # cs.AI
        3,  # cs.SY
        5,  # cs.CE
        6,  # cs.PL
        7,  # cs.IT
        8,  # cs.DS
        9   # cs.NE
    }

    dataset["train"] = dataset["train"].filter(lambda example: example["label"] in allowed_labels)

    dataset["validation"] = dataset["validation"].filter(lambda example: example["label"] in allowed_labels)

    dataset["test"] = dataset["test"].filter(lambda example: example["label"] in allowed_labels)

    return dataset