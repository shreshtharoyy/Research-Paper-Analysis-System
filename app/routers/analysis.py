from pathlib import Path
import shutil

from fastapi import APIRouter, File, UploadFile

from app.services.analysis_service import AnalysisService
from pipeline.analysis_result import AnalysisResult

router = APIRouter()

analysis_service = AnalysisService()


@router.post(
    "/analyze",
    response_model=AnalysisResult,
)
async def analyze_pdf(
    file: UploadFile = File(...)
):

    upload_dir = Path("app/uploads")
    upload_dir.mkdir(parents=True, exist_ok=True)

    filename = file.filename

    if filename is None:
        raise ValueError("Uploaded file must have a filename.")

    pdf_path = upload_dir / filename

    with pdf_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = await analysis_service.analyze(pdf_path)

    return result