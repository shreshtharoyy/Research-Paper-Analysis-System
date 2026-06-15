interface SummaryCardProps {
    summary: string;
}

function SummaryCard({
    summary,
}: SummaryCardProps) {

    return (

        <section className="mt-8 rounded-xl bg-white p-6 shadow-md">

            <h2 className="mb-4 text-2xl font-semibold">

                Summary

            </h2>

            <p className="leading-8 text-gray-700">

                {summary}

            </p>

        </section>

    );

}

export default SummaryCard;