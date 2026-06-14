import type { ChangeEvent } from "react";

interface UploadCardProps {
    onFileSelect: (file: File) => void;
}

function UploadCard({
    onFileSelect,
}: UploadCardProps) {

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {

        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        onFileSelect(file);
    };

    return (
        <div className="rounded-xl border bg-white p-8 shadow-md">

            <h2 className="mb-6 text-2xl font-semibold">
                Upload Research Paper
            </h2>

            <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="block w-full rounded-md border p-3"
            />

        </div>
    );
}

export default UploadCard;