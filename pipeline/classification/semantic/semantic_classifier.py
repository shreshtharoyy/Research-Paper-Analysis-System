import numpy as np
from sentence_transformers import SentenceTransformer
from .label_definitions import DOMAIN_DESCRIPTIONS

model = SentenceTransformer("BAAI/bge-small-en-v1.5")

def classify_paper_semantically(text): 
    paper_embedding = model.encode(text, normalize_embeddings=True)

    best_domain = None
    best_score = -1.0

    for domain, descriptions in DOMAIN_DESCRIPTIONS.items():
        domain_embedding = model.encode(descriptions, normalize_embeddings=True)

        score = np.dot(paper_embedding, domain_embedding)

        if score > best_score:
            best_score = score
            best_domain = domain

    if best_domain is None:
        raise ValueError("No domain could be classified.")

    return {
        "domain": best_domain,
        "confidence": float(best_score)
    }