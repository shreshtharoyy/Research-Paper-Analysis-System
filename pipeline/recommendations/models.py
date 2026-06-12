from typing import List, Optional
from pydantic import BaseModel, Field

class Paper(BaseModel):
    paper_id : str = Field(..., description="Unique identifier of the paper")
    title: str = Field(..., description="Title of the research paper")
    authors: List[str] = Field(..., description="List of author names")
    year: Optional[int] = Field(default=None, description="Publication year")

    citation_count: Optional[int] = Field(default=None, description="Number of citations")
    abstract: Optional[str] = Field(default=None, description="Paper abstract")
    
    paper_url: Optional[str] = Field(default=None, description="URL of the research paper")