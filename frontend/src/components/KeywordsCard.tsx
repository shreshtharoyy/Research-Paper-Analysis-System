interface KeywordsCardProps {
    keywords: string[];
}

function KeywordsCard({
    keywords,
}: KeywordsCardProps) {

    return (

        <section className="mt-8 rounded-xl bg-white p-6 shadow-md">

            <h2 className="mb-6 text-2xl font-semibold">

                Keywords

            </h2>

            <div className="flex flex-wrap gap-3">

                {keywords.map((keyword) => (

                    <span
                        key={keyword}
                        className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
                    >
                        {keyword}
                    </span>

                ))}

            </div>

        </section>

    );

}

export default KeywordsCard;