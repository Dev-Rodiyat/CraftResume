import FormSectionWrapper from "../FormSectionWrapper";
import { useState } from "react";

export default function CertificationsForm({ formData, setFormData }) {
    const [form, setForm] = useState({
        title: "",
        issuer: "",
        date: "",
        link: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const addCert = () => {
        if (!form.title.trim() || !form.issuer.trim()) return;

        const updatedCerts = [...(formData.certifications || []), form];
        setFormData((prev) => ({ ...prev, certifications: updatedCerts }));

        setForm({ title: "", issuer: "", date: "", link: "" });
    };

    const removeCert = (index) => {
        const updatedCerts = (formData.certifications || []).filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, certifications: updatedCerts }));
    };

    return (
        <FormSectionWrapper title="Certifications">
            <div className="mt-10">
                <div className="grid gap-4 md:grid-cols-2">
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Certificate Title"
                        className="border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        name="issuer"
                        value={form.issuer}
                        onChange={handleChange}
                        placeholder="Issued By"
                        className="border px-3 py-2 rounded"
                    />
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        name="link"
                        value={form.link}
                        onChange={handleChange}
                        placeholder="Certificate URL (optional)"
                        className="border px-3 py-2 rounded"
                    />
                </div>

                <button
                    type="button"
                    onClick={addCert}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add Certification
                </button>

                <ul className="mt-6 space-y-4">
                    {(formData.certifications || []).map((cert, index) => (
                        <li
                            key={index}
                            className="border p-4 rounded-md bg-gray-50 relative"
                        >
                            <h4 className="text-md font-semibold text-gray-800">{cert.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">Issued by: {cert.issuer}</p>
                            {cert.date && (
                                <p className="text-xs text-gray-500">Date: {cert.date}</p>
                            )}
                            {cert.link && (
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 underline"
                                >
                                    View Certificate
                                </a>
                            )}
                            <button
                                onClick={() => removeCert(index)}
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
