import { useState } from "react";
import FormSectionWrapper from "../FormSectionWrapper";

export default function ProjectsForm({ formData, setFormData }) {
    const [form, setForm] = useState({ title: "", description: "", link: "", techStack: "" });

    const projects = formData.projects || [];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const addProject = () => {
        const { title, description } = form;
        if (!title.trim() || !description.trim()) return;

        setFormData((prev) => ({
            ...prev,
            projects: [...(prev.projects || []), form],
        }));

        setForm({ title: "", description: "", link: "", techStack: "" });
    };

    const removeProject = (index) => {
        const updated = projects.filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            projects: updated,
        }));
    };

    return (
        <FormSectionWrapper title='Projects'>
            <div className="mt-10">
                <div className="grid gap-4 md:grid-cols-2">
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Project Title"
                        className="border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        name="link"
                        value={form.link}
                        onChange={handleChange}
                        placeholder="Link (optional)"
                        className="border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        name="techStack"
                        value={form.techStack}
                        onChange={handleChange}
                        placeholder="Technologies (e.g., React, Node.js)"
                        className="border px-3 py-2 rounded md:col-span-2"
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Brief Description"
                        className="border px-3 py-2 rounded md:col-span-2"
                    />
                </div>

                <button
                    type="button"
                    onClick={addProject}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add Project
                </button>

                <ul className="mt-6 space-y-4">
                    {projects.map((project, index) => (
                        <li
                            key={index}
                            className="border p-4 rounded-md bg-gray-50 relative"
                        >
                            <h4 className="text-md font-semibold text-gray-800">
                                {project.title}
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 text-blue-600 underline text-sm"
                                    >
                                        View
                                    </a>
                                )}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                            {project.techStack && (
                                <p className="text-xs text-gray-500 mt-2">Tech: {project.techStack}</p>
                            )}
                            <button
                                onClick={() => removeProject(index)}
                                className="absolute top-2 right-2 text-sm text-red-500 hover:underline"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </FormSectionWrapper>
    );
}
