import { useState } from "react";

import UploadCard from "./components/UploadCard";
import SummaryCard from "./components/SummaryCard";
import ClassificationCard from "./components/ClassificationCard";
import KeywordsCard from "./components/KeywordsCard";
import RecommendationCard from "./components/RecommendationCard";

import api from "./services/api";

import type { AnalysisResult } from "./types/analysis";

function App() {

    const [result, setResult] = useState<AnalysisResult | null>(null);

    const [loading, setLoading] = useState(false);

    const handleFileSelect = async (file: File) => {

        const formData = new FormData();

        formData.append("file", file);

        setLoading(true);

        try {

            const response = await api.post<AnalysisResult>(
                "/analyze",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setResult(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    return (

    <main className="min-h-screen bg-slate-100 p-10">

        <div className="mx-auto max-w-5xl">

            <h1 className="mb-8 text-4xl font-bold">

                Research Paper Analysis System

            </h1>

            {loading ? (
                <p className="text-lg font-medium">
                    Analyzing research paper...
                </p>
            ) : (
                <UploadCard
                    onFileSelect={handleFileSelect}
                />
            )}

            {result && (
                <>

                    <SummaryCard
                        summary={result.summary}
                    />

                    <ClassificationCard
                        domain={result.domain}
                        confidence={result.confidence}
                    />

                    <KeywordsCard
                        keywords={result.keywords}
                    />

                    <RecommendationCard
                        papers={result.recommended_papers}
                    />

                </>
            )}

        </div>

    </main>

    );

}

export default App;