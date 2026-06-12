from pydantic import BaseModel
from pipeline.recommendations.models import Paper

class AnalysisResult(BaseModel):

    summary: str
    domain: str
    confidence: float
    keywords: list[str]
    recommended_papers: list[Paper]