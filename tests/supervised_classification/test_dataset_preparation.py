from pipeline.classification.supervised.dataset_preparation import load_arxiv_dataset, filter_cs_categories, remap_labels

dataset = load_arxiv_dataset()

dataset = filter_cs_categories(dataset)
dataset = remap_labels(dataset)
print(dataset["train"][0])