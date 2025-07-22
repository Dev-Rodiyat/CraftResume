import { useEffect } from "react";
import FormSectionWrapper from "../FormSectionWrapper";

export default function ExperienceForm({ formData, setFormData }) {
    const experiences =
        formData.experiences && formData.experiences.length > 0
            ? formData.experiences
            : [
                {
                    id: Date.now(),
                    jobTitle: "",
                    company: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                },
            ];

    useEffect(() => {
        if (!formData.experiences || formData.experiences.length === 0) {
            setFormData((prev) => ({
                ...prev,
                experiences,
            }));
        }
    }, [])

    const handleChange = (id, field, value) => {
        const updated = experiences.map((exp) =>
            exp.id === id ? { ...exp, [field]: value } : exp
        );
        setFormData((prev) => ({ ...prev, experiences: updated }));
    };

    const addExperience = () => {
        const newEntry = {
            id: Date.now(),
            jobTitle: "",
            company: "",
            startDate: "",
            endDate: "",
            description: "",
        };
        setFormData((prev) => ({
            ...prev,
            experiences: [...(prev.experiences || []), newEntry],
        }));
    };

    const removeExperience = (id) => {
        const updated = experiences.filter((exp) => exp.id !== id);
        setFormData((prev) => ({ ...prev, experiences: updated }));
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <FormSectionWrapper title="Work Experience">
            <div>
                {experiences.map((exp) => (
                    <div
                        key={exp.id}
                        className="mb-6 border border-gray-200 p-4 rounded-xl space-y-4"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Job Title"
                                value={exp.jobTitle}
                                onChange={(e) =>
                                    handleChange(exp.id, "jobTitle", e.target.value)
                                }
                                className="border px-3 py-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Company"
                                value={exp.company}
                                onChange={(e) =>
                                    handleChange(exp.id, "company", e.target.value)
                                }
                                className="border px-3 py-2 rounded"
                            />
                            <input
                                type="date"
                                value={exp.startDate}
                                onChange={(e) => handleChange(exp.id, "startDate", e.target.value)}
                                max={today}
                                className="border px-3 py-2 rounded"
                            />

                            {/* End Date */}
                            <input
                                type="date"
                                value={exp.endDate}
                                onChange={(e) => handleChange(exp.id, "endDate", e.target.value)}
                                max={today}
                                className="border px-3 py-2 rounded"
                            />
                        </div>
                        <textarea
                            placeholder="Job Description / Responsibilities"
                            value={exp.description}
                            onChange={(e) =>
                                handleChange(exp.id, "description", e.target.value)
                            }
                            rows={4}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {experiences.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeExperience(exp.id)}
                                className="text-sm text-red-600 hover:underline"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addExperience}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                >
                    + Add More Experience
                </button>
            </div>
        </FormSectionWrapper>
    );
}
