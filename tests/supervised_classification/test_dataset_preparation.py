from pipeline.classification.supervised.dataset_preparation import load_arxiv_dataset, filter_cs_categories

dataset = load_arxiv_dataset()

dataset = filter_cs_categories(dataset)
print(dataset)