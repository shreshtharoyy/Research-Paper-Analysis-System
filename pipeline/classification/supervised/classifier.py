import torch
from pipeline.classification.supervised.model_loader import model
from pipeline.classification.supervised.model_loader import tokenizer
from pipeline.classification.supervised.label_mapping import ID2LABEL

def classify_paper(text):
    inputs = tokenizer(text, truncation=True, max_lenght=256, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)

    probabilities = torch.softmax(outputs.logits, dim=1)
    confidence, prediction = torch.max(probabilities, dim=1)
    
    return {
    "domain": ID2LABEL[int(prediction.item())],
    "confidence": round(confidence.item(), 4),
    "label_id": int(prediction.item())
    }