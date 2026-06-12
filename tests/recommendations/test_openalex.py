from pipeline.recommendations.openalex import OpenAlexClient

client = OpenAlexClient()

papers = client.search_papers("Machine Learning")

print(f"Found {len(papers)} papers\n")

for paper in papers:
    print(f"Title: {paper.title}")
    print(f"Authors: {', '.join(paper.authors)}")
    print(f"Year: {paper.year}")
    print(f"Citations: {paper.citation_count}")
    print(f"Paper ID: {paper.paper_id}")
    print(f"URL: {paper.paper_url}")
    print(f"Abstract: {(paper.abstract or '')[:200]}...")