from pathlib import Path
from fastapi import UploadFile
from pipeline.analysis_pipeline import AnalysisPipeline
from pipeline.analysis_result import AnalysisResult

class AnalysisService:

    def __init__(self) -> None:
        self.pipeline = AnalysisPipeline()

    async def analyze(self, pdf_path: Path,) -> AnalysisResult: 
        return self.pipeline.run(pdf_path)