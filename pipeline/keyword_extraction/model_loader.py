from sentence_transformers import SentenceTransformer
import spacy

nlp = spacy.load("en_core_web_sm")
model = SentenceTransformer("BAAI/bge-small-en-v1.5")