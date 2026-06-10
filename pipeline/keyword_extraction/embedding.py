from torch import Tensor
from .model_loader import model

def generate_embeddings(text: list[str]) -> Tensor:

    embedding = model.encode(text, normalize_embeddings=True, convert_to_tensor=True)
    return embedding