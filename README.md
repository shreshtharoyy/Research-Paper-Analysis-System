# Research-Paper-Analysis-System

An NLP-powered research paper analysis system that combines semantic similarity methods and transformer-based classification to automatically identify research domains, generate concise summaries, extract keywords, and recommend related papers.

## Tech Stack

- ModernBERT (Fine-Tuned)
- KeyBERT
- DistilBART
- BAAI/bge-small-en-v1.5
- FAISS
- FastAPI
- PyTorch


## Research Paper Domain Classification

The system implements two complementary classification approaches:

#### 1. Semantic Classification
- Uses BAAI/bge-small-en-v1.5 embeddings
- Compares paper embeddings against domain descriptions using cosine similarity
- Provides domain prediction without task-specific training

#### 2. Supervised Classification
- Fine-tuned ModernBERT model
- Trained on 20,752 arXiv research papers
- Supports the following domains:
  - Computer Vision
  - Artificial Intelligence
  - Systems and Control
  - Computational Engineering
  - Programming Languages
  - Information Theory
  - Data Structures and Algorithms
  - Neural and Evolutionary Computing

### Why Two Classification Approaches?

The project compares a semantic embedding-based classifier against a fine-tuned ModernBERT classifier to evaluate the trade-offs between similarity-based and supervised learning approaches for research paper domain classification.

### PDF Processing Pipeline

- PDF text extraction using PyMuPDF
- Text cleaning and normalization
- Abstract extraction for classification
- End-to-end research paper analysis workflow

### Architecture

Research Paper (PDF)
        ↓
 PDF Text Extraction
        ↓
   Text Cleaning
        ↓
 Abstract Extraction
        ↓
 ┌───────────────────┬───────────────────┐
 │                   │                   │
 ▼                   ▼
Semantic       ModernBERT
Classifier     Classifier
 │                   │
 ▼                   ▼
Domain        Domain
Prediction    Prediction


## Research Paper Summarization

The summarization module generates concise abstractive summaries of research papers using **DistilBART**.

Instead of processing the entire document, the system first extracts the most informative sections—including the **Abstract**, **Results**, **Conclusion**, and **Limitations**—to reduce irrelevant content and provide focused input to the summarization model.

### Workflow

```
Research Paper PDF
        │
        ▼
PDF Text Extraction
        │
        ▼
Section Extraction
(Abstract, Results,
Conclusion, Limitations)
        │
        ▼
DistilBART
        │
        ▼
Abstractive Summary
```

### Features

* Extracts key sections from research papers
* Generates concise abstractive summaries
* Uses DistilBART for efficient local inference
* Reduces unnecessary processing by summarizing only relevant sections
* Designed to work as part of the complete research paper analysis pipeline

## Semantic Keyword Extraction

The Semantic Keyword Extraction module identifies the most relevant keywords from a research paper abstract using a modular semantic retrieval pipeline. Instead of relying on an end-to-end library, the complete workflow is implemented from scratch to provide greater flexibility, interpretability, and extensibility.

### Pipeline

```text
Abstract
    │
    ▼
Candidate Generation
    │
    ▼
Candidate Validation
    │
    ▼
Semantic Embedding Generation
    │
    ▼
Cosine Similarity Ranking
    │
    ▼
Maximal Marginal Relevance (MMR)
    │
    ▼
Final Keywords
```

---

#### Candidate Generation

Potential keyword candidates are generated using **CountVectorizer** configured with statistical n-gram extraction.

* Stop-word removal
* Bi-gram and tri-gram extraction
* Lowercase normalization
* Maximum candidate limit

This stage focuses on maximizing candidate recall before semantic filtering.

---

#### Candidate Validation

Generated candidates are validated using **spaCy Part-of-Speech (POS) tagging**.

Candidates containing grammatical structures unsuitable for keywords (e.g., verbs, conjunctions, determiners, pronouns, auxiliary verbs) are removed, retaining primarily noun-oriented phrases.

---

#### Semantic Embedding Generation

The abstract and all validated candidates are encoded using the **BAAI/bge-small-en-v1.5** Sentence Transformer model.

Semantic embeddings capture contextual meaning, allowing keyword ranking beyond simple lexical matching.

---

#### Cosine Similarity Ranking

Cosine similarity is computed between the document embedding and each candidate embedding.

Candidates are ranked according to their semantic relevance to the research paper.

---

#### Maximal Marginal Relevance (MMR)

After semantic ranking, **Maximal Marginal Relevance (MMR)** is applied to improve keyword diversity.

MMR balances two objectives:

* **Relevance** — selecting keywords that best represent the document.
* **Diversity** — avoiding multiple highly similar keywords.

This produces a concise set of informative and non-redundant keywords.

---

### Models & Libraries

| Component            | Technology                       |
| -------------------- | -------------------------------- |
| Candidate Generation | CountVectorizer (scikit-learn)   |
| Candidate Validation | spaCy (`en_core_web_sm`)         |
| Embedding Model      | `BAAI/bge-small-en-v1.5`         |
| Similarity Metric    | Cosine Similarity                |
| Diversification      | Maximal Marginal Relevance (MMR) |

---

### Design Philosophy

The keyword extraction pipeline follows a modular architecture where each stage has a single responsibility:

* Candidate Generation
* Candidate Validation
* Semantic Embedding Generation
* Similarity Ranking
* Keyword Diversification

This design enables individual modules to be independently improved or replaced without affecting the rest of the pipeline.

---

### Current Limitations

The current implementation relies on statistical n-gram candidate generation. While it performs well across many academic domains, highly action-oriented abstracts (e.g., some computer vision papers) may produce less precise candidate phrases.

Future improvements may include dependency-based noun phrase extraction or domain-specific scientific parsers while preserving the remaining semantic ranking pipeline.

## Research Paper Recommendation

The recommendation module discovers research papers related to the uploaded document using the OpenAlex REST API.

Instead of maintaining a local research paper corpus, the system performs real-time scholarly search based on the extracted semantic keywords. This approach keeps the project lightweight, scalable, and independent of local datasets.

### Recommendation Pipeline

```text
Extracted Keywords
        │
        ▼
Recommendation Module
        │
        ▼
OpenAlex REST API
        │
        ▼
Research Papers
        │
        ▼
Paper Objects
```

### Features

* Fetches relevant research papers from the OpenAlex scholarly database.
* Uses extracted semantic keywords as the search query.
* Parses OpenAlex responses into structured `Paper` objects.
* Reconstructs abstracts from OpenAlex's inverted index representation.
* Extracts author names, publication year, citation count, and paper URL.
* Returns recommendation results in a modular, reusable format.

### Why OpenAlex?

OpenAlex was selected because it:

* Provides free access without requiring API keys.
* Covers research papers across multiple domains including Computer Science, Artificial Intelligence, Medicine, Biology, Finance, Education, Engineering, and more.
* Exposes a well-documented REST API suitable for production-style backend development.
* Supplies rich scholarly metadata such as citations, authors, abstracts, publication year, and persistent paper identifiers.

### Technologies Used

* Python
* Requests
* OpenAlex REST API
* Pydantic

## Current Progress

✅ PDF Processing

✅ Semantic Domain Classification

✅ Fine-Tuned ModernBERT Classifier

✅ TLDR Generation

✅ Keyword Extraction

✅ Semantic Paper Recommendation

🚧 FastAPI Integration