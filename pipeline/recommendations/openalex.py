import os
import logging
from typing import List

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

from pipeline.recommendations.models import Paper

logger = logging.getLogger(__name__)


class OpenAlexClient:
    def __init__(self, timeout: int = 20):
        self.base_url = "https://api.openalex.org"
        self.timeout = timeout

        # OpenAlex serves a faster, more reliable "polite pool" to clients that
        # identify themselves. Set OPENALEX_MAILTO to opt in.
        self.mailto = os.getenv("OPENALEX_MAILTO")

        self.session = requests.Session()
        self.session.headers.update(
            {
                "User-Agent": "Papermind/1.0 (research-paper-analysis-system)"
                + (f" mailto:{self.mailto}" if self.mailto else "")
            }
        )

        # Retry transient failures (timeouts, rate limits, 5xx) with backoff.
        retry = Retry(
            total=2,
            backoff_factor=0.6,
            status_forcelist=[429, 500, 502, 503, 504],
            allowed_methods=["GET"],
        )
        self.session.mount("https://", HTTPAdapter(max_retries=retry))

    def search_papers(self, query: str) -> List[Paper]:
        endpoint = f"{self.base_url}/works"
        params = {"search": query, "per-page": 5}
        if self.mailto:
            params["mailto"] = self.mailto

        try:
            response = self.session.get(
                endpoint, params=params, timeout=self.timeout
            )
            response.raise_for_status()
            data = response.json()
        except requests.RequestException as exc:
            # A single failed query should never crash the whole analysis;
            # degrade gracefully to no recommendations for this query.
            logger.warning("OpenAlex search failed for %r: %s", query, exc)
            return []

        papers = []

        for work in data.get("results", []):
            paper = self._parse_paper(work)
            papers.append(paper)

        return papers

    def _parse_authors(self, authorships: list) -> List[str]:

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

        open_access = work.get("open_access", {})

        paper_url = (
            open_access.get("oa_url")
            or work.get("doi")
            or work.get("id", "")
        )

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
            paper_url=paper_url
        )
