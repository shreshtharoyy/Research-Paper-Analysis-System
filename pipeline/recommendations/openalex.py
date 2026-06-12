from typing import List
import requests
from pipeline.recommendations.models import Paper

class OpenAlexClient:
    def __init__(self):
        self.base_url= "https://api.openalex.org"
        self.timeout=10

    def search_papers(self, query: str) -> List[Paper]:
        endpoint = f"{self.base_url}/works"
        params = {"search": query, "per-page":5}

        response = requests.get(endpoint, params=params, timeout=self.timeout)
        response.raise_for_status
        data = response.json()
        papers = []
        
        for work in data.get("results", []):
            paper = self._parse_paper(work)
            papers.append(paper)

        return papers

    def _parse_authors(self, authorships: list) ->  List[str]:

        authors = []

        for author_info in authorships:
            author = author_info.get("author", {})
            name = author.get("display_name")

            if name:
                authors.append(name)

        return authors

    def _parse_abstract(self, abstract_index: dict | None) -> str:

        if not abstract_index:
            return ""

        max_position = max(
            position
            for positions in abstract_index.values()
            for position in positions
        )

        words = [""] * (max_position + 1)

        for word, positions in abstract_index.items():
            for position in positions:
                words[position] = word

        return " ".join(words)
    
    def _parse_paper(self, work: dict) -> Paper:
        return Paper(
            paper_id=work.get("id", ""),
            title=work.get("title", ""),
            authors=self._parse_authors(
                work.get("authorships", [])
            ),
            year=work.get("publication_year"),
            citation_count=work.get("cited_by_count", 0),
            abstract=self._parse_abstract(
                work.get("abstract_inverted_index")
            ),
            paper_url=work.get("id", "")
        )
