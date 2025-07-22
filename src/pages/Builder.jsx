import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BuilderForm from "../components/builder/BuilderForm";
import { useSearchParams } from "react-router-dom";

const initialFormData = {
    personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        address: "",
        socialLinks: [""],
    },
    experience: [],
    education: [],
    certifications: [],
    skills: [],
    projects: [],
    title: ""
};

export default function Builder() {
    const [formData, setFormData] = useState(initialFormData);

    const [searchParams] = useSearchParams();
    const editId = searchParams.get("edit");

    useEffect(() => {
        if (editId) {
            const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
            const resumeToEdit = resumes.find(r => r.id.toString() === editId);
            if (resumeToEdit) {
                setFormData(resumeToEdit.formData);
            }
        }
    }, [editId]);

    return (
        <div className="relative px-4 py-6 min-h-screen pb-28">
            <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
                Resume Builder
            </h2>
            <AnimatePresence mode="wait">
                <motion.div
                    key="resume"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                >
                    <BuilderForm
                        formData={formData}
                        setFormData={setFormData}
                        editId={editId}
                        initialState={initialFormData}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
