## Features

### Research Paper Domain Classification

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

### PDF Processing Pipeline

- PDF text extraction using PyMuPDF
- Text cleaning and normalization
- Abstract extraction for classification
- End-to-end research paper analysis workflow

## Architecture

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

## Current Progress

✅ PDF Processing

✅ Semantic Domain Classification

✅ Fine-Tuned ModernBERT Classifier

🚧 Keyword Extraction

🚧 TLDR Generation

🚧 Semantic Paper Recommendation

🚧 FastAPI Integration
