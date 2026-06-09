from .model_loader import tokenizer, model

def generate_summary(text: str) -> str:
    inputs = tokenizer(text, max_length=1024, truncation=True, return_tensors="pt")

    summary_ids = model.generate(input_ids=inputs["input_ids"], attention_mask=inputs["attention_mask"], max_length=220, min_length=80, num_beams=6, length_penalty=1.2, no_repeat_ngram_size=3, early_stopping=True)
    summary =  tokenizer.decode(summary_ids[0], skip_special_tokens=True)

    return summary

