from torch import Tensor
from sentence_transformers import util

def compute_similarity(document_embedding: Tensor, candidate_embedding: Tensor) -> Tensor:
    similarity_scores = util.cos_sim(document_embedding, candidate_embedding)

    return similarity_scores.squeeze(0)