from pipeline.recommendations.models import Paper

def test_paper_model_creation():
    paper = Paper(
        paper_id="123",
        title="Attention Is All You Need",
        authors=["Ashish Vaswani", "Noam Shazeer"],
    )

    assert paper.paper_id == "123"
    assert paper.title == "Attention Is All You Need"
    assert paper.authors == ["Ashish Vaswani", "Noam Shazeer"]

    assert paper.year is None
    assert paper.citation_count is None
    assert paper.abstract is None
    assert paper.paper_url is None