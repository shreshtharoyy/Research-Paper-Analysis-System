import type { Paper } from "../types/analysis";

interface RecommendationCardProps {
    papers: Paper[];
}

function RecommendationCard({
    papers,
}: RecommendationCardProps) {

    return (

        <section className="mt-8 rounded-xl bg-white p-6 shadow-md">

            <h2 className="mb-6 text-2xl font-semibold">
                Recommended Papers
            </h2>

            <div className="space-y-6">

                {papers.map((paper) => (

                    <article
                        key={paper.paper_id}
                        className="rounded-lg border p-5"
                    >

                        <h3 className="text-xl font-semibold">
                            {paper.title}
                        </h3>

                        <p className="mt-2 text-gray-600">
                            {paper.authors.join(", ")}
                        </p>

                        <div className="mt-4 flex gap-6 text-sm text-gray-500">

                            <span>
                                <strong>Year:</strong> {paper.year}
                            </span>

                            <span>
                                <strong>Citations:</strong> {paper.citation_count}
                            </span>

                        </div>

                        <a
                            href={paper.paper_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Open Paper ↗
                        </a>

                    </article>

                ))}

            </div>

        </section>

    );

}

export default RecommendationCard;