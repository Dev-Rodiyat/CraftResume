import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FaArrowLeft, FaDownload, FaEdit, FaPrint } from "react-icons/fa";
import html2pdf from "html2pdf.js";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaGlobe,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function ResumeView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [resumeData, setResumeData] = useState(null);
    const resumeRef = useRef(null);

    useEffect(() => {
        const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
        const found = resumes.find((r) => r.id.toString() === id);
        setResumeData(found);
    }, [id]);

    const handleDownload = () => {
        if (!resumeRef.current) return;
        html2pdf().from(resumeRef.current).save(`${resumeData?.name || "resume"}.pdf`);
    };

    const handleEdit = () => {
        navigate(`/builder?type=resume&edit=${resumeData.id}`);
    };

    if (!resumeData) {
        return <div className="text-center py-20 text-gray-500">Resume not found.</div>;
    }

    const { formData } = resumeData;

    const getSocialIcon = (url) => {
        if (url.includes("linkedin.com")) return <FaLinkedin className="text-blue-700" />;
        if (url.includes("github.com")) return <FaGithub className="text-gray-800" />;
        if (url.includes("x.com")) return <FaXTwitter className="text-gray-800" />;
        if (url.includes("http")) return <FaGlobe className="text-green-600" />;
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6 print:hidden">
                <button
                    onClick={() => navigate("/my-craft")}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                    title="Back"
                >
                    <FaArrowLeft />
                </button>
                <h1 className="text-2xl font-bold">{resumeData.name || "Untitled Resume"}</h1>
                <div className="flex gap-4 print:hidden">
                    <button onClick={handleDownload} className="text-blue-600 flex items-center gap-1">
                        <FaDownload /> Download
                    </button>
                    <button onClick={() => window.print()} className="text-green-600 flex items-center gap-1">
                        <FaPrint /> Print
                    </button>
                    <button onClick={handleEdit} className="text-gray-600 flex items-center gap-1">
                        <FaEdit /> Edit
                    </button>
                </div>
            </div>

            <div
                ref={resumeRef}
                className="bg-white shadow p-6 rounded text-gray-900 print:shadow-none print:p-0 print:rounded-none print:bg-white"
            >
                <div className="border-b pb-4 mb-6 text-center">
                    <h2 className="text-3xl font-bold pb-2">{formData?.personalInfo?.fullName}</h2>
                    <p className="text-sm text-gray-700 pb-2">{formData?.personalInfo?.email} | {formData?.personalInfo?.phone} | {formData?.personalInfo?.location}</p>
                    <div className="flex justify-center gap-4 mt-2 text-blue-600">
                        {formData?.personalInfo?.socialLinks?.map((link, idx) => (
                            <a
                                key={idx}
                                href={link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1 text-sm hover:underline"
                            >
                                {getSocialIcon(link)}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                {formData?.summary && (
                    <section className="mb-6">
                        <h3 className="text-lg font-semibold border-b pb-1 mb-2">Summary</h3>
                        <p className="text-sm">{formData.summary}</p>
                    </section>
                )}

                {/* Experience */}
                {formData?.experiences?.length > 0 && (
                    <section className="mb-6">
                        <h3 className="text-lg font-semibold border-b pb-1 mb-2">Experience</h3>
                        <div className="space-y-4">
                            {formData.experiences.map((exp, i) => (
                                <div key={i}>
                                    <p className="font-semibold">{exp.jobTitle} @ {exp.company}</p>
                                    <p className="text-sm text-gray-600">{exp.startDate} – {exp.endDate}</p>
                                    <p className="text-sm">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {formData?.education?.length > 0 && (
                    <section className="mb-6">
                        <h3 className="text-lg font-semibold border-b pb-1 mb-2">Education</h3>
                        <div className="space-y-4">
                            {formData.education.map((edu, i) => (
                                <div key={i}>
                                    <p className="font-semibold">{edu.degree} - {edu.institution}</p>
                                    <p className="text-sm text-gray-600">{edu.startDate} – {edu.endDate}</p>
                                    <p className="text-sm">{edu.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {formData?.projects?.length > 0 && (
                    <section className="mb-6">
                        <h3 className="text-lg font-semibold border-b pb-1 mb-2">Projects</h3>
                        <div className="space-y-4">
                            {formData.projects.map((proj, i) => (
                                <div key={i}>
                                    <p className="font-semibold">{proj.title}</p>
                                    <p className="text-sm text-gray-600">{proj.date}</p>
                                    <p className="text-sm">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {formData?.languages?.length > 0 && (
                    <section className="mb-6">
                        <h3 className="text-lg font-semibold border-b pb-1 mb-2">Languages</h3>
                        <ul className="flex flex-wrap gap-3 text-sm">
                            {formData.languages.map((lang, i) => (
                                <li key={i} className="bg-gray-100 px-3 py-1 rounded">{lang}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Skills */}
                {formData?.skills?.length > 0 && (
                    <section className="mb-2">
                        <h3 className="text-lg font-semibold border-b pb-1 mb-2">Skills</h3>
                        <ul className="flex flex-wrap gap-2 text-sm">
                            {formData.skills.map((skill, i) => (
                                <li key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{skill}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
}
