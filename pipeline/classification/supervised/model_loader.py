from pathlib import Path
from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification

model_path = Path(__file__).parent / "trained_model"

tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForSequenceClassification.from_pretrained(model_path)

model.eval()
