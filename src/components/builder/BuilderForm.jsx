import { useState } from "react";
import CertificationsForm from "./FormSections/CertificationsForm";
import EducationForm from "./FormSections/EducationForm";
import ExperienceForm from "./FormSections/ExperienceForm";
import PersonalInfoForm from "./FormSections/PersonalInfoForm";
import ProjectsForm from "./FormSections/ProjectsForm";
import SkillsForm from "./FormSections/SkillsForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function BuilderForm({ formData, setFormData, initialState, editId }) {
    const navigate = useNavigate();

    const handleSaveDraft = () => {
        const existing = JSON.parse(localStorage.getItem("resumes")) || [];

        if (editId) {
            const updated = existing.map((item) =>
                item.id.toString() === editId
                    ? {
                        ...item,
                        name: formData?.title || "Untitled",
                        date: new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }),
                        formData,
                    }
                    : item
            );
            localStorage.setItem("resumes", JSON.stringify(updated));
            toast.success("Resume updated!");
        } else {
            const fullData = {
                id: Date.now(),
                name: formData?.title || "Untitled",
                date: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
                formData,
                type: "resume",
            };
            localStorage.setItem("resumes", JSON.stringify([fullData, ...existing]));
            toast.success("Resume saved!");
        }

        setFormData(initialState);
        navigate("/my-craft");
    };

    return (
        <div className="lg:w-[70%] w-full md:w-[80%] mx-auto px-4 flex justify-center">
            <div className="space-y-10 bg-white p-6 rounded-xl shadow-sm border w-full max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Build Your Resume
                </h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="resumeTitle">
                        Resume Title
                    </label>
                    <input
                        id="resumeTitle"
                        type="text"
                        placeholder="e.g. Frontend Developer Resume"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <section>
                    <PersonalInfoForm formData={formData} setFormData={setFormData} />
                </section>

                <section>
                    <ExperienceForm formData={formData} setFormData={setFormData} />
                </section>

                <section>
                    <EducationForm formData={formData} setFormData={setFormData} />
                </section>

                <section>
                    <CertificationsForm formData={formData} setFormData={setFormData} />
                </section>

                <section>
                    <SkillsForm formData={formData} setFormData={setFormData} />
                </section>

                <section>
                    <ProjectsForm formData={formData} setFormData={setFormData} />
                </section>

                <div className="pt-6 flex justify-end gap-4 border-t">
                    <button
                        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        type="button"
                        onClick={handleSaveDraft}
                    >
                        Save
                    </button>

                    <button
                        className="px-5 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                        type="button"
                        onClick={() => setFormData(initialState)}
                    >
                        Clear Form
                    </button>
                </div>
            </div>
        </div>
    );
}
