import { useEffect } from "react";
import FormSectionWrapper from "../FormSectionWrapper";

export default function EducationForm({ formData, setFormData }) {
    const education =
        formData.education && formData.education.length > 0
            ? formData.education
            : [
                {
                    id: Date.now(),
                    degree: "",
                    institution: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                },
            ];

    useEffect(() => {
        if (!formData.education || formData.education.length === 0) {
            setFormData((prev) => ({
                ...prev,
                education,
            }));
        }
    }, []);

    const handleChange = (id, field, value) => {
        const updated = education.map((edu) =>
            edu.id === id ? { ...edu, [field]: value } : edu
        );
        setFormData((prev) => ({ ...prev, education: updated }));
    };

    const addEducation = () => {
        const newEntry = {
            id: Date.now(),
            degree: "",
            institution: "",
            startDate: "",
            endDate: "",
            description: "",
        };
        setFormData((prev) => ({
            ...prev,
            education: [...(prev.education || []), newEntry],
        }));
    };

    const removeEducation = (id) => {
        const updated = education.filter((edu) => edu.id !== id);
        setFormData((prev) => ({ ...prev, education: updated }));
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <FormSectionWrapper title="Education">
            <div className="mt-10">
                {education.map((edu) => (
                    <div
                        key={edu.id}
                        className="mb-6 border border-gray-200 p-4 rounded-xl space-y-4"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Degree"
                                value={edu.degree}
                                onChange={(e) =>
                                    handleChange(edu.id, "degree", e.target.value)
                                }
                                className="border px-3 py-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Institution"
                                value={edu.institution}
                                onChange={(e) =>
                                    handleChange(edu.id, "institution", e.target.value)
                                }
                                className="border px-3 py-2 rounded"
                            />
                            <input
                                type="date"
                                value={edu.startDate}
                                onChange={(e) => handleChange(edu.id, "startDate", e.target.value)}
                                max={today}
                                className="border px-3 py-2 rounded"
                            />
                            <input
                                type="date"
                                value={edu.endDate}
                                onChange={(e) => handleChange(edu.id, "endDate", e.target.value)}
                                max={today}
                                className="border px-3 py-2 rounded"
                            />
                        </div>
                        <textarea
                            placeholder="Description / Achievements"
                            value={edu.description}
                            onChange={(e) =>
                                handleChange(edu.id, "description", e.target.value)
                            }
                            rows={4}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {education.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeEducation(edu.id)}
                                className="text-sm text-red-600 hover:underline"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addEducation}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                >
                    + Add More Education
                </button>
            </div>
        </FormSectionWrapper>
    );
}
