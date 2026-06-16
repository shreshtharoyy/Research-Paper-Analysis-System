# Backend image for Hugging Face Spaces (Docker SDK).
# Serves the FastAPI app on port 7860 (the port HF Spaces expects).
FROM python:3.12-slim

# Build tooling for any packages that compile from source.
RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
    && rm -rf /var/lib/apt/lists/*

# HF Spaces runs containers as uid 1000. Give that user a writable home so
# model downloads and caches don't hit permission errors.
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH \
    HF_HOME=/home/user/.cache/huggingface \
    PYTHONUNBUFFERED=1

WORKDIR /home/user/app

# Install CPU-only PyTorch first so the multi-GB CUDA wheel is never pulled.
# If this exact version isn't on the CPU index, drop the version pin.
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir torch==2.12.0 \
        --index-url https://download.pytorch.org/whl/cpu

# Python dependencies + the spaCy English model.
COPY --chown=user:user requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt && \
    python -m spacy download en_core_web_sm

# Pre-download the always-public models so cold starts are fast (baked in).
# The fine-tuned ModernBERT is loaded at runtime from MODERNBERT_MODEL_ID.
RUN python -c "from transformers import AutoTokenizer, AutoModelForSeq2SeqLM; AutoTokenizer.from_pretrained('sshleifer/distilbart-cnn-12-6'); AutoModelForSeq2SeqLM.from_pretrained('sshleifer/distilbart-cnn-12-6')" && \
    python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('BAAI/bge-small-en-v1.5')"

# Application code.
COPY --chown=user:user . .

EXPOSE 7860
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
