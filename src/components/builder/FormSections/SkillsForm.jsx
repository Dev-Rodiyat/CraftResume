import { useState } from "react";
import FormSectionWrapper from "../FormSectionWrapper";

export default function SkillsForm({ formData, setFormData }) {
    const skills = formData.skills || [];
    const [inputValue, setInputValue] = useState("");

    const addSkill = () => {
        const trimmed = inputValue.trim();
        if (!trimmed || skills.includes(trimmed) || skills.length >= 5) return;

        setFormData((prev) => ({
            ...prev,
            skills: [...skills, trimmed],
        }));
        setInputValue("");
    };

    const removeSkill = (skillToRemove) => {
        setFormData((prev) => ({
            ...prev,
            skills: skills.filter((skill) => skill !== skillToRemove),
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    };

    const isLimitReached = skills.length >= 5;

    return (
        <FormSectionWrapper title='Skills'>
            <div className="mt-10">
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder={isLimitReached ? "Skill limit reached" : "Enter a skill and press Enter"}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 border px-3 py-2 rounded"
                        disabled={isLimitReached}
                    />
                    <button
                        type="button"
                        onClick={addSkill}
                        disabled={isLimitReached}
                        className={`px-4 py-2 rounded text-white ${
                            isLimitReached
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                        >
                            {skill}
                            <button
                                onClick={() => removeSkill(skill)}
                                className="ml-1 text-blue-600 hover:text-red-500"
                                title="Remove"
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
                {isLimitReached && (
                    <p className="text-sm text-red-500 mt-2">Maximum of 5 skills allowed.</p>
                )}
            </div>
        </FormSectionWrapper>
    );
}
