from pipeline.classification.supervised.classifier import classify_paper

sample_text = """
This paper presents a convolutional neural network
for image classification and object detection.
"""

result = classify_paper(sample_text)
print(result)