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

    for split in ["train", "validation", "test"]:
        dataset[split] = dataset[split].filter(lambda x: x["label"] in allowed_labels)

    return dataset

def remap_labels(dataset):

    label_remap = {
        1: 0,  # cs.CV
        2: 1,  # cs.AI
        3: 2,  # cs.SY
        5: 3,  # cs.CE
        6: 4,  # cs.PL
        7: 5,  # cs.IT
        8: 6,  # cs.DS
        9: 7   # cs.NE
    }

    for split in ["train", "validation", "test"]:
        dataset[split] = dataset[split].map(lambda x: {"label": label_remap[x["label"]]})

    return dataset
