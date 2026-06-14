from fastapi import FastAPI
from app.routers.analysis import router as analysis_router

app = FastAPI(
    title="Research Paper Analysis System",
    description="Analyze research papers using NLP techniques and recommend related papers."
)

app.include_router(analysis_router)