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

## Current Progress

✅ PDF Processing

✅ Semantic Domain Classification

✅ Fine-Tuned ModernBERT Classifier

✅ TLDR Generation

🚧 Keyword Extraction

🚧 Semantic Paper Recommendation

🚧 FastAPI Integration