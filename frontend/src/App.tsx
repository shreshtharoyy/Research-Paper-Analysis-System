import { useState } from "react";

import UploadCard from "./components/UploadCard";

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
                <pre className="mt-8 overflow-auto rounded-lg bg-white p-6 shadow">
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}

        </div>

    </main>

    );

}

export default App;