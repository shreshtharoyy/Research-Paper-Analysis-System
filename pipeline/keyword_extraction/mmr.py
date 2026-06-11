from torch import Tensor
from sentence_transformers import util


def maximal_marginal_relevance(
    document_embedding: Tensor,
    candidate_embeddings: Tensor,
    candidates: list[str],
    top_n: int = 10,
    diversity: float = 0.7
) -> list[str]:

    top_n = min(top_n, len(candidates))

    document_similarity = util.cos_sim(
        document_embedding,
        candidate_embeddings
    )[0]

    candidate_similarity = util.cos_sim(
        candidate_embeddings,
        candidate_embeddings
    )

    selected_indices: list[int] = [
        int(document_similarity.argmax().item())
    ]

    while len(selected_indices) < top_n:

        best_score = float("-inf")
        best_index = -1

        for index in range(len(candidates)):

            if index in selected_indices:
                continue

            relevance = float(document_similarity[index].item())

            redundancy = max(
                float(candidate_similarity[index, selected].item())
                for selected in selected_indices
            )

            mmr_score = (
                diversity * relevance
                - (1 - diversity) * redundancy
            )

            if mmr_score > best_score:
                best_score = mmr_score
                best_index = index

        selected_indices.append(best_index)

    return [
        candidates[index]
        for index in selected_indices
    ]