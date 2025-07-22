import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ResumeList() {
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("resumes")) || [];
        setResumes(saved);
    }, []);

    const handleDelete = (id) => {
        const updated = resumes.filter((res) => res.id !== id);
        setResumes(updated);
        window.confirm(localStorage.setItem("resumes", JSON.stringify(updated)))
    };

    const handleDownload = (resume) => {
        const blob = new Blob([JSON.stringify(resume, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${resume.name || "resume"}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (resumes.length === 0) {
        return (
            <div className="text-center text-gray-500 py-16">
                <p className="text-lg mb-2">No resumes yet.</p>
                <p className="text-sm">Click below to craft your first one.</p>
                <Link
                    to="/builder?type=resume"
                    className="inline-block mt-8 bg-blue-600 text-white font-medium px-5 py-2 rounded-full hover:bg-blue-700 transition"
                >
                    + New Resume
                </Link>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
                <div
                    key={resume.id}
                    className="border rounded-xl p-5 shadow-sm hover:shadow-md transition"
                >
                    <h2 className="text-lg font-semibold mb-2">
                        {resume.name || "Untitled Resume"}
                    </h2>
                    <p className="text-sm text-gray-500">Created on {resume.date}</p>
                    <div className="mt-4 flex gap-3">
                        <Link
                            to={`/resume/${resume.id}`}
                            className="text-blue-600 text-sm hover:underline"
                        >
                            View
                        </Link>
                        <button
                            onClick={() => handleDownload(resume)}
                            className="text-gray-500 text-sm hover:underline"
                        >
                            Download
                        </button>
                        <button
                            onClick={() => handleDelete(resume.id)}
                            className="text-red-500 text-sm hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
