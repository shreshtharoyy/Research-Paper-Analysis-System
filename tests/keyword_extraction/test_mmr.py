from pipeline.pdf_processing import extract_text_from_pdf, clean_text
from pipeline.section_extraction import extract_abstract

from pipeline.keyword_extraction.candidate_generator import generate_candidates
from pipeline.keyword_extraction.candidate_validator import is_valid_pos_pattern

from pipeline.keyword_extraction.embedding import generate_embeddings
from pipeline.keyword_extraction.mmr import maximal_marginal_relevance


# text = extract_text_from_pdf(
#     "sample_papers/online_shopping_behavior.pdf"
# )

# text = clean_text(text)

# abstract = extract_abstract(text)

abstract = """We present YOLO, a new approach to object detection.
Prior work on object detection repurposes classifiers to perform detection. Instead, we frame object detection as a regression problem to spatially separated bounding boxes and
associated class probabilities. A single neural network predicts bounding boxes and class probabilities directly from
full images in one evaluation. Since the whole detection
pipeline is a single network, it can be optimized end-to-end
directly on detection performance.
Our unified architecture is extremely fast. Our base
YOLO model processes images in real-time at 45 frames
per second. A smaller version of the network, Fast YOLO,
processes an astounding 155 frames per second while
still achieving double the mAP of other real-time detectors. Compared to state-of-the-art detection systems, YOLO
makes more localization errors but is less likely to predict
false positives on background. Finally, YOLO learns very
general representations of objects. It outperforms other detection methods, including DPM and R-CNN, when generalizing from natural images to other domains like artwork"""

candidates = generate_candidates(abstract)

valid_candidates = [
    candidate
    for candidate in candidates
    if is_valid_pos_pattern(candidate)
]

document_embedding = generate_embeddings([abstract])

candidate_embeddings = generate_embeddings(valid_candidates)

keywords = maximal_marginal_relevance(
    document_embedding=document_embedding,
    candidate_embeddings=candidate_embeddings,
    candidates=valid_candidates,
    top_n=10,
    diversity=0.7
)

print()

for keyword in keywords:

    print(keyword)