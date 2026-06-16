from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.analysis import router as analysis_router

app = FastAPI(
    title="Research Paper Analysis System",
    description="Analyze research papers using NLP techniques and recommend related papers."
)

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://papermind-io.vercel.app",
    ],

    # Also allow Vercel preview deployments (e.g. papermind-io-git-*.vercel.app).
    allow_origin_regex=r"https://.*\.vercel\.app",

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

@app.get("/")
def health():
    return {"status": "ok", "service": "Papermind API"}


app.include_router(analysis_router)