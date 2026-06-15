interface ClassificationCardProps {
    domain: string;
    confidence: number;
}

function ClassificationCard({
    domain,
    confidence,
}: ClassificationCardProps) {

    return (

        <section className="mt-8 rounded-xl bg-white p-6 shadow-md">

            <h2 className="mb-6 text-2xl font-semibold">

                Classification

            </h2>

            <div className="grid grid-cols-2 gap-6">

                <div>

                    <h3 className="text-sm font-medium text-gray-500">

                        Domain

                    </h3>

                    <p className="mt-2 text-xl font-semibold">

                        {domain}

                    </p>

                </div>

                <div>

                    <h3 className="text-sm font-medium text-gray-500">

                        Confidence

                    </h3>

                    <p className="mt-2 text-xl font-semibold">

                        {(confidence * 100).toFixed(2)}%

                    </p>

                </div>

            </div>

        </section>

    );

}

export default ClassificationCard;