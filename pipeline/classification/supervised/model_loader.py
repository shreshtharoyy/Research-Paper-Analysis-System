import os
from pathlib import Path
from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification

# Where to load the fine-tuned ModernBERT classifier from, in priority order:
#   1. MODERNBERT_MODEL_ID env var (override for deployment), else
#   2. the local trained_model/ folder if it exists (local development), else
#   3. the published Hugging Face Hub repo (deployment fallback).
default_path = Path(__file__).parent / "trained_model"
hub_repo = "shreshhhh123/papermind-modernbert"

model_source = os.getenv("MODERNBERT_MODEL_ID")
if not model_source:
    model_source = str(default_path) if default_path.exists() else hub_repo

tokenizer = AutoTokenizer.from_pretrained(model_source)
model = AutoModelForSequenceClassification.from_pretrained(model_source)

model.eval()
